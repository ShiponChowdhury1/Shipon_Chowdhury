# Shipon Chowdhury Portfolio

A modern, full-stack portfolio website built with Next.js 14, featuring an admin dashboard for project management.

## 🚀 Features

### Public Portfolio
- **Responsive Design** - Beautiful, mobile-first UI with Tailwind CSS
- **Framer Motion Animations** - Smooth, professional animations
- **Project Showcase** - Dynamic project listings with filtering
- **Featured Projects** - Highlight your best work
- **Project Details** - Detailed project pages with screenshots
- **Analytics** - Track views and clicks on projects

### Admin Dashboard
- **Protected Routes** - Secure admin-only access with NextAuth
- **Project Management** - Full CRUD operations for projects
- **Analytics Dashboard** - View total projects, views, clicks, and engagement
- **Draft/Published Status** - Control project visibility
- **Featured Toggle** - Mark projects as featured
- **Real-time Updates** - Server actions with automatic revalidation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth v4
- **Validation:** Zod
- **Animations:** Framer Motion
- **Forms:** React Hook Form

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (already configured)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   
   The `.env.local` file is already configured with your MongoDB credentials.

3. **Seed the Database**
   ```bash
   npm run seed
   ```
   
   This will create sample projects and an admin user.
   
   **Default Admin Credentials:**
   - Email: `admin@rahikahsan.com`
   - Password: `admin123`
   
   ⚠️ **Change these credentials after first login!**

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Homepage: http://localhost:3000
   - Login: http://localhost:3000/login
   - Dashboard: http://localhost:3000/dashboard

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## 🔐 Authentication

The app uses **NextAuth v4** with credentials provider:

- Admin users can access `/dashboard/*` routes
- Non-authenticated users are redirected to `/login`
- Session management with JWT tokens

## 📊 Admin Dashboard Features

### Dashboard Home
- Total projects count
- Total views and clicks
- Engagement rate
- Recent projects list
- Top performing projects

### Projects Management
- View all projects in grid layout
- Create new projects
- Edit existing projects
- Delete projects (with confirmation)
- Toggle draft/published status
- Mark projects as featured
- View project analytics

## 🎨 Customization

### Update Personal Info

1. **Update metadata** in `app/layout.tsx`
2. **Change name/logo** in `components/layout/navbar.tsx`
3. **Update footer info** in `components/layout/footer.tsx`
4. **Modify hero section** in `app/page.tsx`

### Add Categories

Update `CATEGORIES` in `lib/constants.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## 📚 Key Concepts

### Server Actions

All data operations use Next.js Server Actions:
- Located in `server/actions/`
- Automatic revalidation with `revalidatePath`
- Type-safe with TypeScript
- No API routes needed

### Best Practices Implemented

✅ Server Components by default  
✅ Server Actions for mutations  
✅ Proper error handling  
✅ Form validation with Zod  
✅ Protected routes  
✅ Responsive design  
✅ Accessible components  
✅ Performance optimizations  

## 👤 Author

**Shipon Chowdhury**

---

Built with ❤️ using Next.js 14 and modern web technologies.
# Shipon_Chowdhury
