
export interface Internship {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  stipend: string;
  stipendValue?: number;
  experienceLevel?: 'Entry Level' | 'Intermediate' | 'Advanced';
  duration: string;
  verified: boolean;
  postedDate: string;
  description: string;
  requirements?: string[];
  payDetails?: string[];
  jobType?: 'Full-time' | 'Part-time' | 'Remote';
  interviewType?: 'Online' | 'In-person';
  contact?: {
    phone: string;
    email: string;
    address: string;
  };
  status?: 'Vacant' | 'Filled';
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  priceInTokens: number;
  image: string;
  description: string;
  perks: string[];
  category: 'AI' | 'Data Science' | 'Web Dev' | 'Marketing';
}

export interface Application {
  id: string;
  internshipId: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'hired' | 'rejected';
  appliedDate: string;
  internshipTitle: string;
  companyName: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'reviewed';
  senderName: string;
}

export type UserRole = 'student' | 'recruiter' | 'supervisor';

export interface UserProfile {
  firstName: string;
  lastNameInitial: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  rating: number;
  region?: string;
  tokenBalance: number;
  ownedCourses: string[]; // array of course IDs
  education: {
    institution: string;
    level: 'Undergraduate' | 'Graduate';
    fieldOfStudy: string;
  };
  skills: string[];
  availability: {
    type: 'Full-time' | 'Part-time';
    duration: string;
  };
  interests: string[];
  bio: string;
  links: {
    email: string;
    linkedin?: string;
    portfolio?: string;
  };
  referralStats?: {
    code: string;
    totalReferrals: number;
    successfulHires: number;
  };
}
