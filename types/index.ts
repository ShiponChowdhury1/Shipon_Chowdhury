// Project Types
export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  coverImage: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status?: 'draft' | 'published';
  views?: number;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Types
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  createdAt?: Date;
}

// Form Types
export interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  coverImage: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status?: 'draft' | 'published';
}

// Analytics Types
export interface AnalyticsData {
  totalProjects: number;
  totalViews: number;
  totalClicks: number;
  recentProjects: IProject[];
  topProjects: IProject[];
}
