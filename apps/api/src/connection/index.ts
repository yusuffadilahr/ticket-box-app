import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

export const prisma = new PrismaClient
dotenv.config()


const password = process.env.PASSWORD_MYSQL2 || ""


export const mysqlConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'db_tiket',
  });

  return connection;
};