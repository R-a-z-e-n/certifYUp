import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './prisma.js';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow GET to trigger seeding for now
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Clearing existing data...');
    await prisma.application.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.internship.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding internships...');
    const internships = await Promise.all([
      prisma.internship.create({
        data: {
          title: 'Frontend Developer Intern',
          company: 'TechFlow Systems',
          category: 'Technology',
          location: 'Remote',
          stipend: '$1,200/mo',
          description: 'Help us build the next generation of developer tools using React and Tailwind CSS.',
          verified: true
        }
      }),
      prisma.internship.create({
        data: {
          title: 'UI/UX Design Intern',
          company: 'CreativePulse',
          category: 'Design',
          location: 'San Francisco, CA',
          stipend: '$1,500/mo',
          description: 'Design intuitive user experiences for our fintech mobile application.',
          verified: true
        }
      }),
      prisma.internship.create({
        data: {
          title: 'Data Analyst Intern',
          company: 'InsightMetrics',
          category: 'Data Science',
          location: 'Hybrid',
          stipend: '$1,000/mo',
          description: 'Clean, analyze and visualize large datasets to drive business decisions.',
          verified: false
        }
      })
    ]);

    return response.status(200).json({
      message: 'Database seeded successfully!',
      stats: {
        internships: internships.length
      }
    });
  } catch (error: any) {
    console.error('Seeding Error:', error);
    return response.status(500).json({ 
      message: 'Seeding failed', 
      error: error.message 
    });
  }
}
