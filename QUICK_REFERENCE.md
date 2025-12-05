# Quick Reference Guide

## 🚀 Common Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database with sample data
npm run seed
```

## 🔑 Login Credentials

**Admin Access:**
- URL: http://localhost:3000/login
- Email: `admin@rahikahsan.com`
- Password: `admin123`

## 📍 Important URLs

### Public Pages
- Homepage: http://localhost:3000
- All Projects: http://localhost:3000/projects
- Login: http://localhost:3000/login

### Dashboard (Admin Only)
- Dashboard Home: http://localhost:3000/dashboard
- Manage Projects: http://localhost:3000/dashboard/projects
- Create Project: http://localhost:3000/dashboard/projects/new
- Settings: http://localhost:3000/dashboard/settings

## 🔧 Quick Fixes

### Server won't start?
```bash
# Remove lock file
Remove-Item -Path ".\.next\dev\lock" -Force

# Kill node processes
Get-Process node | Stop-Process -Force

# Restart server
npm run dev
```

### Database issues?
```bash
# Re-seed database
npm run seed
```

### Build errors?
```bash
# Clean and reinstall
Remove-Item -Recurse -Force node_modules, .next
npm install
npm run dev
```

## 📝 Creating a New Project (Dashboard)

1. Login at `/login`
2. Go to Dashboard → Projects
3. Click "New Project"
4. Fill in:
   - Title (required)
   - Description (required)
   - Category (select from dropdown)
   - Tags (press Enter to add each tag)
   - Cover Image URL (required)
   - Live URL (optional)
   - GitHub URL (optional)
   - Featured toggle
   - Status (draft/published)
5. Click "Create Project"

## 🎨 Customization Quick Tasks

### Change Site Name
**File:** `components/layout/navbar.tsx`
```tsx
// Line ~29
<span>Your Name Here</span>
```

### Update Hero Section
**File:** `app/page.tsx`
```tsx
// Lines 25-35
<h1>Your Title Here</h1>
<p>Your description here</p>
```

### Modify Footer
**File:** `components/layout/footer.tsx`
```tsx
// Update social links and contact info
```

### Add New Category
**File:** `lib/constants.ts`
```tsx
export const CATEGORIES = [
  'Web App',
  'Your New Category', // Add here
] as const;
```

## 🌐 Environment Variables

**File:** `.env.local`
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

### Generate Secret Key
```bash
openssl rand -base64 32
```

## 📦 Project Structure Quick Reference

```
app/
├── api/auth/          # Authentication
├── dashboard/         # Admin area (protected)
├── login/             # Login page
├── projects/          # Public projects
└── page.tsx           # Homepage

components/
├── dashboard/         # Dashboard components
├── layout/            # Navbar, Footer, Sidebar
└── ui/                # Buttons, Cards, Inputs

server/
├── actions/           # Server actions (API logic)
├── db/                # Database connection
└── models/            # Data models (User, Project)

hooks/                 # Custom React hooks
lib/                   # Utilities, validators
types/                 # TypeScript types
```

## 🔍 Debugging Tips

### Check Database
```bash
# View in MongoDB Atlas
# Or use MongoDB Compass with your connection string
```

### Check Console
- Browser DevTools → Console (F12)
- Terminal output
- Network tab for API calls

### Common Issues

**Can't login?**
- Check if database is seeded
- Verify credentials
- Clear browser cookies

**Projects not showing?**
- Check project status (draft vs published)
- Verify database connection
- Check server logs

**Images not loading?**
- Ensure image URLs are accessible
- Or add images to `/public/images`
- Update Next.js image configuration if needed

## 🚢 Deployment Checklist

### Before Deploy
- [ ] Update NEXTAUTH_SECRET
- [ ] Set production MongoDB URI
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Test build locally: `npm run build`
- [ ] Add real images
- [ ] Update personal info
- [ ] Remove console.logs

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy
5. Update NEXTAUTH_URL to Vercel domain

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generated-secret>
```

## 📚 Key Files to Edit

### Essential Customization
- `app/layout.tsx` - Site metadata
- `app/page.tsx` - Homepage content
- `components/layout/navbar.tsx` - Navigation/branding
- `components/layout/footer.tsx` - Footer/social links
- `.env.local` - Configuration

### Advanced Customization
- `lib/constants.ts` - Categories, routes
- `server/models/Project.ts` - Project schema
- `components/ui/` - UI components styling
- `app/globals.css` - Global styles

## 💻 VSCode Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- MongoDB for VS Code

## 🎯 Next Features to Add

### Easy
- [ ] Add more social media links
- [ ] Create more sample projects
- [ ] Add testimonials section
- [ ] Add skills section

### Medium
- [ ] Contact form with email
- [ ] Search functionality
- [ ] Filter by category
- [ ] Dark mode toggle

### Advanced
- [ ] Image upload (Cloudinary)
- [ ] Blog section
- [ ] Comments on projects
- [ ] Email notifications
- [ ] Multi-language support

---

**Need Help?**
- Check PROJECT_COMPLETE.md for detailed info
- Review Next.js docs
- MongoDB documentation
- NextAuth documentation
