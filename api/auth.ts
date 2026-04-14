import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './prisma.js';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'POST') {
    const { action, email, password, firstName, lastNameInitial, role } = request.body;

    try {
      if (action === 'signup') {
        const user = await prisma.user.create({
          data: {
            email,
            firstName: firstName || 'New',
            lastNameInitial: lastNameInitial || 'U.',
            role: role || 'student',
            // In a real app, we would hash the password here.
            // For this demo, we're just storing the user.
          },
        });
        return response.status(201).json({ message: 'User created', user });
      } else if (action === 'login') {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (user) {
          return response.status(200).json({ message: 'Login successful', user });
        } else {
          return response.status(401).json({ message: 'Invalid credentials' });
        }
      }
    } catch (error: any) {
      console.error('Auth Error:', error);
      return response.status(500).json({ message: 'Authentication failed', error: error.message });
    }
  }

  return response.status(405).json({ message: 'Method not allowed' });
}
