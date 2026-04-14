import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './prisma.js';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // This attempts to connect to the database.
    // It requires the DATABASE_URL environment variable to be set.
    const userCount = await prisma.user.count();
    
    response.status(200).json({
      message: 'Backend is connected to the database!',
      userCount,
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    response.status(500).json({
      message: 'Backend is running, but database connection failed. Make sure DATABASE_URL is set.',
      error: error.message,
    });
  }
}
