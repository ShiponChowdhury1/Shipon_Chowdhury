import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/server/db/mongoose';
import Project from '@/server/models/Project';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);
    const project = await Project.findById(resolvedParams.id).lean();

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
