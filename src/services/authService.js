import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Prisma} from '../generated/prisma/index.js'
//import { Prisma } from '@prisma/client'
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 3600000;

//Has business logic for signing up new users
export async function signUp(username, email, password) {
    //Grabbing ser inputted password then hashing it
    const hashedPassword = await bcrypt.hash(password, 10);
    //Creating user in User DB with username, email, hashed password
    try{
        const newUser = await createUser({
            username,
            email,
            passwordHash: hashedPassword,
        });
        return newUser;
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                const error = new Error('Email has already been used');
                error.status = 409;
                throw error;
            }
            throw error;
        }
    }
}

export async function logIn(email, password){
    //Check email by looking through user DB
    const user = await findUserByEmail(email);
    if(!user) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    //Check password by comparing hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    //JWT token
    const accessToken = jwt.sign({email: user.email, role: user.role}, JWT_SECRET,
         {expiresIn: JWT_EXPIRES_IN}
        );
    return accessToken;
} 


//New stuff for login logout now with refresh tokens
let newPrisma;
function prisma(){
    if(!newPrisma) newPrisma = new (require('@prisma/client').PrismaClient)();
    return newPrisma;
}

function generateRefreshToken(){
    return jwt.sign({}, JWT_SECRET, {expiresIn: '7d'});
}

export async function issueTokens(user){
    const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    const refreshToken = generateRefreshToken();
    await prisma().refreshToken.upsert({
        where: { userId: user.id },
        update: { token: refreshToken },
        create: { userId: user.id, token: refreshToken },
    });
    return { accessToken, refreshToken };
}

export async function logOut(refreshToken){
    if (!refreshToken) return;
    await prisma().refreshToken.deleteMany({
        where: { token: refreshToken },
    });
}