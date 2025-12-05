export const CATEGORIES = [
  'Full Stack',
  'Web App',
  'Dashboard',
  'Landing Page',
  'E-commerce',
  'API',
  'Other',
] as const;

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  LOGIN: '/login',
} as const;
