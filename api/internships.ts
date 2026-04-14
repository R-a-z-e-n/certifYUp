import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './lib/prisma.js';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'GET') {
    try {
      const internships = await prisma.internship.findMany({
        orderBy: { postedDate: 'desc' }
      });
      return response.status(200).json(internships);
    } catch (error: any) {
      console.error('Fetch Internships Error:', error);
      return response.status(500).json({ message: 'Failed to fetch internships', error: error.message });
    }
  }

  if (request.method === 'POST') {
    // Only recruiters should do this in a real app, but for now we allow it for testing
    const { title, company, category, location, stipend, description } = request.body;
    try {
      const internship = await prisma.internship.create({
        data: { title, company, category, location, stipend, description }
      });
      return response.status(201).json(internship);
    } catch (error: any) {
      return response.status(500).json({ message: 'Failed to create internship', error: error.message });
    }
  }

  return response.status(405).json({ message: 'Method not allowed' });
}
