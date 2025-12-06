'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/server/db/mongoose';
import Project from '@/server/models/Project';
import { IProject } from '@/types';
import { projectSchema } from '@/lib/validators';

// Get all projects (with optional filters)
export async function getProjects(filters?: {
  status?: 'draft' | 'published';
  featured?: boolean;
  category?: string;
}) {
  try {
    await connectDB();

    const query: any = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.featured !== undefined) query.featured = filters.featured;
    if (filters?.category) query.category = filters.category;

    const projects = await Project.find(query)
      .select('-__v') // Exclude version key
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(projects)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch projects',
    };
  }
}

// Get single project by slug
export async function getProjectBySlug(slug: string) {
  try {
    await connectDB();

    const project = await Project.findOne({ slug })
      .select('-__v')
      .lean()
      .exec();

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    // Increment views asynchronously without waiting
    Project.findByIdAndUpdate(project._id, { $inc: { views: 1 } }).exec();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch project',
    };
  }
}

// Create new project
export async function createProject(data: FormData) {
  try {
    await connectDB();

    // Check if data is actually FormData
    if (!data || typeof data.get !== 'function') {
      return {
        success: false,
        error: 'Invalid form data',
      };
    }

    const formData = {
      title: data.get('title')?.toString() || '',
      description: data.get('description')?.toString() || '',
      longDescription: data.get('longDescription')?.toString() || '',
      category: data.get('category')?.toString() || '',
      tags: JSON.parse(data.get('tags')?.toString() || '[]'),
      coverImage: data.get('coverImage')?.toString() || '',
      screenshots: JSON.parse(data.get('screenshots')?.toString() || '[]'),
      liveUrl: data.get('liveUrl')?.toString() || '',
      githubUrl: data.get('githubUrl')?.toString() || '',
      featured: data.get('featured') === 'true',
      status: (data.get('status')?.toString() || 'published') as 'draft' | 'published',
    };

    // Validate data
    const validated = projectSchema.parse(formData);

    // Generate slug
    const slug = validated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return {
        success: false,
        error: 'A project with this title already exists',
      };
    }

    const project = await Project.create({
      ...validated,
      slug,
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/projects');
    revalidatePath('/');

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create project',
    };
  }
}

// Update project
export async function updateProject(data: FormData) {
  try {
    await connectDB();

    // Check if data is actually FormData
    if (!data || typeof data.get !== 'function') {
      return {
        success: false,
        error: 'Invalid form data',
      };
    }

    const id = data.get('id')?.toString();
    if (!id) {
      return {
        success: false,
        error: 'Project ID is required',
      };
    }

    const formData = {
      title: data.get('title')?.toString() || '',
      description: data.get('description')?.toString() || '',
      longDescription: data.get('longDescription')?.toString() || '',
      category: data.get('category')?.toString() || '',
      tags: JSON.parse(data.get('tags')?.toString() || '[]'),
      coverImage: data.get('coverImage')?.toString() || '',
      screenshots: JSON.parse(data.get('screenshots')?.toString() || '[]'),
      liveUrl: data.get('liveUrl')?.toString() || '',
      githubUrl: data.get('githubUrl')?.toString() || '',
      featured: data.get('featured') === 'true',
      status: (data.get('status')?.toString() || 'published') as 'draft' | 'published',
    };

    // Validate data
    const validated = projectSchema.parse(formData);

    const project = await Project.findByIdAndUpdate(
      id,
      { ...validated },
      { new: true, runValidators: true }
    );

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/');

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update project',
    };
  }
}

// Delete project
export async function deleteProject(id: string) {
  try {
    await connectDB();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/projects');
    revalidatePath('/');

    return {
      success: true,
      message: 'Project deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete project',
    };
  }
}

// Get analytics data
export async function getAnalytics() {
  try {
    await connectDB();

    const totalProjects = await Project.countDocuments();
    const totalViews = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } },
    ]);
    const totalClicks = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$clicks' } } },
    ]);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const topProjects = await Project.find()
      .sort({ views: -1 })
      .limit(5)
      .lean();

    return {
      success: true,
      data: {
        totalProjects,
        totalViews: totalViews[0]?.total || 0,
        totalClicks: totalClicks[0]?.total || 0,
        recentProjects: JSON.parse(JSON.stringify(recentProjects)),
        topProjects: JSON.parse(JSON.stringify(topProjects)),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch analytics',
    };
  }
}

// Increment project clicks
export async function incrementClicks(slug: string) {
  try {
    await connectDB();

    await Project.findOneAndUpdate({ slug }, { $inc: { clicks: 1 } });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to increment clicks',
    };
  }
}
