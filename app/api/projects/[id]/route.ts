import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/server/db/mongoose';
import Project from '@/server/models/Project';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);
    const project = await Project.findById(resolvedParams.id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
