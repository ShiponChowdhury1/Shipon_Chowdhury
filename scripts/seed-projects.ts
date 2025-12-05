import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Load environment variables FIRST
config({ path: resolve(process.cwd(), '.env.local') });

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Simple connection function
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Import Project model dynamically
const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  tags: [String],
  coverImage: { type: String, required: true },
  screenshots: [String],
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
}, { timestamps: true }));

const sampleProjects = [
  {
    title: "E-Commerce Fashion Platform",
    description: "A modern e-commerce platform for fashion brands with seamless shopping experience and advanced filtering.",
    longDescription: `A comprehensive e-commerce solution built for fashion retailers. The platform features advanced product filtering and search, real-time inventory management, secure payment integration with Stripe, user authentication and profile management, order tracking and history, responsive design for all devices, admin dashboard for product management, shopping cart with persistent storage, and product reviews and ratings system.

Built with Next.js 14, MongoDB, and Stripe for a seamless shopping experience.`,
    category: "E-commerce",
    tags: ["Next.js", "MongoDB", "Stripe", "TypeScript", "Tailwind CSS", "React"],
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://fashion-store-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/fashion-ecommerce",
    featured: true,
    status: "published"
  },
  {
    title: "Task Management Dashboard",
    description: "A collaborative task management system with real-time updates, team collaboration features, and analytics.",
    longDescription: `A powerful task management dashboard designed for modern teams. Features include Kanban board with drag-and-drop functionality, real-time collaboration with Socket.io, team member management and permissions, project timelines and Gantt charts, task dependencies and subtasks, file attachments and comments, analytics and reporting dashboard, email notifications, and dark mode support.

Perfect for agile teams and project managers to stay organized and productive.`,
    category: "Dashboard",
    tags: ["React", "Node.js", "Socket.io", "PostgreSQL", "Chart.js", "Material-UI"],
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://taskboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/task-dashboard",
    featured: true,
    status: "published"
  },
  {
    title: "Restaurant Booking App",
    description: "A mobile-first restaurant reservation system with table management and customer reviews.",
    longDescription: `A complete restaurant booking solution with real-time table availability, QR code table check-in, menu browsing with images, reservation management, customer reviews and ratings, push notifications for booking confirmations, loyalty points system, admin panel for restaurant owners, integration with Google Maps, and payment processing for deposits.

Built with React Native for iOS and Android, with a Next.js admin dashboard.`,
    category: "Mobile App",
    tags: ["React Native", "Next.js", "MongoDB", "Firebase", "Google Maps API"],
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://dining-reserve-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/restaurant-app",
    featured: false,
    status: "published"
  },
  {
    title: "SaaS Landing Page",
    description: "A high-converting landing page for a SaaS product with modern animations and lead capture.",
    longDescription: `A stunning landing page designed to convert visitors into customers. Features include eye-catching hero section with video background, feature showcase with interactive animations, pricing comparison table, customer testimonials carousel, FAQ accordion section, newsletter subscription, live chat integration, mobile-responsive design, SEO optimized, and fast loading with optimized images.

Built with Next.js 14 and Framer Motion for smooth animations.`,
    category: "Landing Page",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "Vercel"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://saas-landing-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/saas-landing",
    featured: false,
    status: "published"
  },
  {
    title: "Fitness Tracking Web App",
    description: "A comprehensive fitness tracking application with workout plans, progress tracking, and nutrition logging.",
    longDescription: `Complete fitness solution for health enthusiasts. Features include custom workout plan builder, exercise library with video demonstrations, progress tracking with charts, nutrition and calorie counter, workout timer and rest intervals, body measurements tracking, goal setting and achievements, social features to share progress, integration with fitness wearables, and personal trainer dashboard.

Helping users achieve their fitness goals with data-driven insights.`,
    category: "Web App",
    tags: ["Next.js", "MongoDB", "Chart.js", "PWA", "TypeScript", "Tailwind CSS"],
    coverImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://fitness-track-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    featured: false,
    status: "published"
  },
  {
    title: "Design System Library",
    description: "A comprehensive design system with reusable components, design tokens, and documentation.",
    longDescription: `A production-ready design system for scalable applications. Includes 50+ customizable React components, design tokens for colors, spacing, typography, dark mode support, accessibility-first approach (WCAG 2.1), interactive component playground, comprehensive documentation with Storybook, TypeScript support, Figma design files included, NPM package for easy installation, and theme customization guide.

Built for developers and designers to build consistent UIs faster.`,
    category: "Design System",
    tags: ["React", "Storybook", "TypeScript", "Figma", "CSS-in-JS", "NPM"],
    coverImage: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&h=800&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop"
    ],
    liveUrl: "https://design-system-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/design-system",
    featured: true,
    status: "published"
  }
];

async function seedProjects() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing projects...');
    await Project.deleteMany({});
    console.log('✅ Cleared existing projects');

    console.log('📝 Creating sample projects...');
    
    for (const project of sampleProjects) {
      const slug = project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      await Project.create({
        ...project,
        slug,
        views: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 50) + 10,
      });
      
      console.log(`  ✅ Created: ${project.title}`);
    }
    
    console.log('\n🎉 Successfully created all sample projects!');
    console.log(`📊 Total projects: ${sampleProjects.length}`);
    console.log('\n🌐 Visit http://localhost:3000/projects to view them');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
