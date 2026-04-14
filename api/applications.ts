import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'GET') {
    const { userId } = request.query;
    if (!userId) return response.status(400).json({ message: 'User ID required' });

    try {
      const applications = await prisma.application.findMany({
        where: { userId: String(userId) },
        include: { internship: true }
      });
      return response.status(200).json(applications);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'POST') {
    const { userId, internshipId } = request.body;
    try {
      const application = await prisma.application.create({
        data: {
          userId,
          internshipId,
          status: 'submitted'
        },
        include: { internship: true }
      });
      return response.status(201).json(application);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: 'Method not allowed' });
}
