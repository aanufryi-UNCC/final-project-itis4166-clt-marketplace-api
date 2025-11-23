import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import {Prisma} from '../generated/prisma/index.js'
import { Prisma } from '@prisma/client'
import { createUser, findUserByEmail, deleteRefreshToken, upsertRefreshToken } from '../repositories/userRepo.js';

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

export async function logIn(email, password) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    return await issueTokens(user);
}


// Generate tokens
function generateRefreshToken(user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
}

export async function issueTokens(user) {
    const accessToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = generateRefreshToken(user);

    await upsertRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
}

// Logout
export async function logOut(refreshToken) {
    if (!refreshToken) throw new Error('No refresh token provided');
    await deleteRefreshToken(refreshToken);
}