# Admin Dashboard Guide

## 🔐 Admin Access

Admin dashboard শুধুমাত্র admin role থাকা users access করতে পারবে।

**Login URL:** `http://localhost:3000/login`

**Default Admin Credentials:**
- Email: `admin@rahikahsan.com`
- Password: `admin123`

⚠️ **Important:** Production এ যাওয়ার আগে এই credentials পরিবর্তন করুন!

---

## 📊 Dashboard Features

### 1. **Dashboard Overview** (`/dashboard`)
- Total Projects count
- Total Views statistics
- Total Clicks tracking
- Engagement Rate calculation
- Recent Projects list
- Top Performing Projects

### 2. **Projects Management** (`/dashboard/projects`)

#### ✅ View All Projects
- Grid layout with project cards
- Project status (Published/Draft)
- View count display
- Featured badge
- Category labels

#### ➕ Create New Project (`/dashboard/projects/new`)

**Required Fields:**
- **Title:** Project name
- **Description:** Short description (shown on cards)
- **Category:** Select from dropdown
  - Web App
  - Mobile App
  - Dashboard
  - Landing Page
  - E-commerce
  - Design System
  - Other
- **Cover Image URL:** Main project image

**Optional Fields:**
- **Long Description:** Detailed project information
- **Tags:** Technology stack (press Enter to add)
- **Screenshots:** Additional images
- **Live URL:** Deployed project link
- **GitHub URL:** Source code repository
- **Featured:** Mark as featured project
- **Status:** Published or Draft

**Steps to Add Project:**
1. Navigate to `/dashboard/projects`
2. Click "New Project" button
3. Fill in all required fields
4. Add tags by typing and pressing Enter
5. Select category from dropdown
6. Choose status (Published/Draft)
7. Check "Featured" if you want to highlight it
8. Click "Create Project"
9. ✅ Success toast will appear
10. Redirected to projects list

#### ✏️ Edit Project (`/dashboard/projects/edit/[id]`)
1. Go to `/dashboard/projects`
2. Click "Edit" button on any project card
3. Modify the fields
4. Click "Update Project"
5. ✅ Success toast will appear

#### 🗑️ Delete Project
1. Go to `/dashboard/projects`
2. Click trash icon on project card
3. Confirm deletion in modal
4. ✅ Success toast will appear
5. Page refreshes automatically

---

## 🎨 Project Display

### Frontend Pages:
- **Home (`/`):** Shows featured projects
- **All Projects (`/projects`):** Shows all published projects with filters
- **Project Detail (`/projects/[slug]`):** Full project case study

### Visibility Rules:
- ✅ **Published + Featured:** Shows on home and projects page
- ✅ **Published:** Shows on projects page only
- ❌ **Draft:** Not visible on public pages (admin only)

---

## 📝 Sample Project Template

```
Title: E-Commerce Fashion Platform

Description: A modern e-commerce platform for fashion brands with seamless shopping experience.

Long Description:
A comprehensive e-commerce solution with:
- Product catalog with advanced filtering
- Shopping cart and checkout
- Payment integration (Stripe)
- Order management
- Admin dashboard
- Mobile responsive design

Category: E-commerce

Tags: Next.js, MongoDB, Stripe, TypeScript, Tailwind CSS

Cover Image: https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop

Live URL: https://your-project.vercel.app
GitHub URL: https://github.com/username/project

Featured: ✅
Status: Published
```

---

## 🚀 Quick Add Multiple Projects

Script দিয়ে একসাথে sample projects add করতে:

```bash
npm run seed:projects
```

এটি 6টি sample projects add করবে:
1. E-Commerce Fashion Platform (Featured)
2. Task Management Dashboard (Featured)
3. Restaurant Booking App
4. SaaS Landing Page
5. Fitness Tracking Web App
6. Design System Library (Featured)

---

## 🎯 Best Practices

### Image URLs:
- ✅ Use Unsplash, Pexels, or your own hosted images
- ✅ Recommended size: 1200x800px
- ✅ Format: JPG or PNG
- ❌ Don't use local file paths

### Tags:
- Add 4-6 relevant technologies
- Use standard names (React, Next.js, MongoDB)
- Keep them concise

### Descriptions:
- Short: 150-200 characters
- Long: 300-500 words
- Include key features and technologies

### Categories:
- Choose the most relevant category
- Web App: General web applications
- Mobile App: iOS/Android apps
- Dashboard: Admin panels, analytics
- Landing Page: Marketing sites
- E-commerce: Online stores
- Design System: Component libraries

---

## 🔧 Troubleshooting

### "Project not showing on homepage"
- ✅ Check if status is "Published"
- ✅ Check if "Featured" is checked
- ✅ Refresh the page

### "Can't upload images"
- Current version uses image URLs
- Upload to Imgur, Cloudinary, or use Unsplash
- Copy the direct image URL

### "Tags not adding"
- Press Enter after typing tag name
- Don't click outside before pressing Enter
- Tags appear as blue pills below input

### "Getting permission error"
- Make sure you're logged in as admin
- Check email: `admin@rahikahsan.com`
- Role must be 'admin' in database

---

## 📊 Analytics

Dashboard automatically tracks:
- **Views:** Every time someone visits project detail page
- **Clicks:** When someone clicks "View Live" button
- **Engagement Rate:** (Clicks / Views) × 100

---

## 🌓 Dark Mode

Dashboard fully supports dark mode:
- Toggle in header
- Automatically syncs across pages
- Saved in localStorage

---

## 📱 Responsive Design

Admin dashboard works on:
- 💻 Desktop (1920px+)
- 💻 Laptop (1280px)
- 📱 Tablet (768px)
- 📱 Mobile (375px)

---

## 🔒 Security

- Admin routes protected with NextAuth
- Only admin role can access dashboard
- Session-based authentication
- Redirects to login if unauthorized

---

## 🆘 Support

For issues or questions:
1. Check console for error messages
2. Verify MongoDB connection
3. Check environment variables
4. Review server action responses

---

**Happy Project Managing! 🚀**
