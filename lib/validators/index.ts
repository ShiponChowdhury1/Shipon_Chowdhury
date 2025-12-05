import { z } from 'zod';

// Project Validation Schema
export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  longDescription: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  coverImage: z.string().min(1, 'Cover image is required'),
  screenshots: z.array(z.string()).optional(),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('published'),
});

// Login Validation Schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// User Registration Schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
