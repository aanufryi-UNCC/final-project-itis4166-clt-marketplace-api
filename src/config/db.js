import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
//Updated to work nicely with Prisma 7
const prisma = new PrismaClient({adapter});

export default prisma;
