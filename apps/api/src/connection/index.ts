import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

export const prisma = new PrismaClient
dotenv.config()

const password = process.env.PASSWORD_MYSQL2 || ""
export const mysqlConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'fresh.jagoanhosting.com',
    user: 'gancymyi_gancy_users',
    password: password,
    database: 'gancymyi_db_ticket',
  });

  return connection;
};

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'fresh.jagoanhosting.com',
      user: 'gancymyi_gancy_users',
      password: 'GancyShop2025!',
      database: 'gancymyi_db_gancyshop',
      port: 3306,
    });
    console.log('Connected to DB!');
    await connection.end();
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();
