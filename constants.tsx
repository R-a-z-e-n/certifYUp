
import { Internship, Course } from './types';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechFlow Systems',
    category: 'Engineering',
    location: 'Remote',
    stipend: '$800 - $1,200',
    stipendValue: 1000,
    experienceLevel: 'Entry Level',
    duration: '3 Months',
    verified: true,
    postedDate: '2023-11-01',
    interviewType: 'Online',
    description: 'Work with React, Tailwind, and modern web technologies to build high-performance user interfaces. You will be part of our core product team, helping to refine our design system and implement complex features.',
    requirements: [
      'Proficiency in React and modern JavaScript (ES6+)',
      'Experience with Tailwind CSS or CSS-in-JS',
      'Understanding of responsive design principles',
      'Portfolio of personal or academic projects'
    ],
    payDetails: [
      '$1,000 monthly base stipend',
      'Performance-based bonus up to $200',
      'Monthly learning & development allowance'
    ],
    contact: {
      phone: '+1 (555) 012-3456',
      email: 'hiring@techflow.io',
      address: '123 Innovation Drive, Silicon Valley, CA'
    }
  },
  {
    id: '2',
    title: 'Marketing Specialist',
    company: 'GrowthGenius',
    category: 'Business',
    location: 'San Francisco, CA',
    stipend: '$1,500',
    stipendValue: 1500,
    experienceLevel: 'Intermediate',
    duration: '6 Months',
    verified: true,
    postedDate: '2023-10-24',
    interviewType: 'In-person',
    description: 'Help scale our digital presence through data-driven marketing campaigns and SEO optimization. You will analyze traffic trends and coordinate with our content team.',
    requirements: [
      'Strong analytical and communication skills',
      'Knowledge of Google Analytics and SEO tools',
      'Prior internship in marketing preferred',
      'Creative mindset and problem-solving ability'
    ],
    payDetails: [
      '$1,500 monthly fixed stipend',
      'Commuter benefits provided',
      'Free lunch at our SF office daily'
    ],
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'careers@growthgenius.com',
      address: '500 Market St, San Francisco, CA'
    }
  },
  {
    id: '4',
    title: 'Data Analyst Intern',
    company: 'InsightMetrics',
    category: 'Data Science',
    location: 'New York, NY',
    stipend: '$2,000',
    stipendValue: 2000,
    experienceLevel: 'Advanced',
    duration: '4 Months',
    verified: true,
    postedDate: '2023-11-05',
    interviewType: 'In-person',
    description: 'Analyze large datasets to extract meaningful business insights using Python and SQL. You will build dashboards for executive teams and optimize internal data flows.',
    requirements: [
      'Advanced knowledge of SQL and Python',
      'Experience with data visualization (Tableau/PowerBI)',
      'Background in Statistics or Applied Math',
      'Ability to translate complex data into clear reports'
    ],
    payDetails: [
      '$2,000 monthly stipend',
      'Project completion bonus ($500)',
      'In-person networking events in NYC'
    ],
    contact: {
      phone: '+1 (555) 222-1111',
      email: 'data-jobs@insightmetrics.com',
      address: '250 Broadway, New York, NY'
    }
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Professional AI Engineer Path',
    provider: 'DeepLearning.AI',
    priceInTokens: 500,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    description: 'Master large language models, neural networks, and prompt engineering.',
    perks: ['Guaranteed Internship Interview', 'Official Certificate', 'Direct Mentor Support'],
    category: 'AI'
  },
  {
    id: 'c2',
    title: 'Advanced Data Analytics',
    provider: 'IBM Academy',
    priceInTokens: 350,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    description: 'Predictive modeling, data visualization, and statistical decision making.',
    perks: ['Internship Placement Assistance', 'Portfolio Review', 'Resume Badge'],
    category: 'Data Science'
  },
  {
    id: 'c3',
    title: 'Full-Stack Web Architect',
    provider: 'Meta Certifications',
    priceInTokens: 400,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
    description: 'Build scalable applications with React, Node, and System Design patterns.',
    perks: ['Verified Skill Badge', 'Direct Referral to Partners', 'Project Mentorship'],
    category: 'Web Dev'
  }
];

export const CATEGORIES = [
  'Engineering',
  'Business',
  'Design',
  'Data Science',
  'Marketing',
  'Sales',
  'HR'
];
