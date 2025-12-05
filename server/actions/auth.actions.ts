'use server';

import { connectDB } from '@/server/db/mongoose';
import User from '@/server/models/User';
import bcrypt from 'bcrypt';
import { registerSchema } from '@/lib/validators';

// Register new user (admin only)
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    await connectDB();

    // Validate data
    const validated = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validated.email });
    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user
    await User.create({
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: 'user',
    });

    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to register user',
    };
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    await connectDB();

    const user = await User.findById(userId).select('-password').lean();

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user profile',
    };
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    image?: string;
  }
) {
  try {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, select: '-password' }
    );

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
}
