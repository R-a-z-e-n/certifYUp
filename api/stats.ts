import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './lib/prisma.js';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') return response.status(405).json({ message: 'Method not allowed' });

  const { userId } = request.query;
  if (!userId) return response.status(400).json({ message: 'User ID required' });

  try {
    const applications = await prisma.application.findMany({
      where: { userId: String(userId) }
    });

    // Grouping by status for charts
    const chartData = [
      { name: 'Submitted', value: applications.filter(a => a.status === 'submitted').length },
      { name: 'Reviewed', value: applications.filter(a => a.status === 'reviewed').length },
      { name: 'Interviewing', value: applications.filter(a => a.status === 'interviewing').length },
      { name: 'Hired', value: applications.filter(a => a.status === 'hired').length },
    ];

    return response.status(200).json({
      total: applications.length,
      chartData
    });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
