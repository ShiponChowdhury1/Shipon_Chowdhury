require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI;

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    longDescription: String,
    category: String,
    tags: [String],
    coverImage: String,
    screenshots: [String],
    liveUrl: String,
    githubUrl: String,
    featured: Boolean,
    status: { type: String, default: 'published' },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    image: String,
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Sample Projects Data
const projects = [
  {
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'Next.js + TailwindCSS portfolio site with animations.',
    longDescription:
      'A full portfolio website with Framer Motion animations, responsive design, and dynamic projects fetched from MongoDB.',
    category: 'Web App',
    tags: ['Next.js', 'Tailwind', 'Framer Motion', 'MongoDB'],
    coverImage: '/images/portfolio-cover.png',
    screenshots: ['/images/portfolio-1.png', '/images/portfolio-2.png'],
    liveUrl: 'https://myportfolio.com',
    githubUrl: 'https://github.com/username/portfolio',
    featured: true,
    status: 'published',
  },
  {
    title: 'Admin Dashboard',
    slug: 'admin-dashboard',
    description: 'Interactive dashboard with charts and CRUD functionality.',
    longDescription:
      'A modern admin dashboard built with Next.js, TailwindCSS, and chart libraries. Supports project management and analytics.',
    category: 'Dashboard',
    tags: ['Next.js', 'Tailwind', 'Chart.js', 'MongoDB'],
    coverImage: '/images/dashboard-cover.png',
    screenshots: ['/images/dashboard-1.png', '/images/dashboard-2.png'],
    liveUrl: '',
    githubUrl: 'https://github.com/username/admin-dashboard',
    featured: false,
    status: 'published',
  },
  {
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-featured e-commerce website with payment integration.',
    longDescription:
      'Complete e-commerce solution with product management, cart, checkout, and Stripe payment integration.',
    category: 'E-commerce',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    coverImage: '/images/ecommerce-cover.png',
    screenshots: ['/images/ecommerce-1.png'],
    liveUrl: 'https://mystore.com',
    githubUrl: '',
    featured: true,
    status: 'published',
  },
  {
    title: 'Mobile App Design',
    slug: 'mobile-app-design',
    description: 'Modern mobile app UI/UX design with Figma.',
    longDescription:
      'Complete mobile app design system with screens, components, and prototypes.',
    category: 'Mobile App',
    tags: ['Figma', 'UI/UX', 'Design System'],
    coverImage: '/images/mobile-cover.png',
    screenshots: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'published',
  },
  {
    title: 'Design System',
    slug: 'design-system',
    description: 'Comprehensive design system with components and guidelines.',
    longDescription:
      'A complete design system built in Figma with reusable components, color schemes, and typography.',
    category: 'Design System',
    tags: ['Figma', 'Design System', 'Components'],
    coverImage: '/images/design-system-cover.png',
    screenshots: ['/images/design-system-1.png'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    status: 'published',
  },
  {
    title: 'Landing Page Redesign',
    slug: 'landing-page-redesign',
    description: 'A/B tested landing page with improved conversion rates.',
    longDescription:
      'Complete landing page redesign with A/B testing, resulting in 40% increase in conversions.',
    category: 'Landing Page',
    tags: ['Next.js', 'A/B Testing', 'Conversion Optimization'],
    coverImage: '/images/landing-cover.png',
    screenshots: [],
    liveUrl: 'https://example.com',
    githubUrl: '',
    featured: false,
    status: 'published',
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await User.deleteMany({});

    // Insert projects
    console.log('📦 Seeding projects...');
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rahikahsan.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + adminEmail,
    });
    console.log('✅ Admin user created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n⚠️  Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
