'use client';

import { useEffect, useState } from 'react';
import { useProjectForm } from '@/hooks/use-project-form';
import { updateProject } from '@/server/actions/project.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { showToast } from '@/lib/toast';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState, startTransition, isPending, error, setError, watch, setValue, reset } =
    useProjectForm();

  const errors = formState?.errors || {};
  const tags = watch('tags') || [];

  useEffect(() => {
    async function loadProject() {
      const resolvedParams = await Promise.resolve(params);
      setProjectId(resolvedParams.id);

      try {
        const response = await fetch(`/api/projects/${resolvedParams.id}`);
        if (response.ok) {
          const project = await response.json();
          reset({
            title: project.title,
            description: project.description,
            longDescription: project.longDescription || '',
            category: project.category,
            tags: project.tags || [],
            coverImage: project.coverImage,
            screenshots: project.screenshots || [],
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            featured: project.featured || false,
            status: project.status || 'draft',
          });
        }
      } catch {
        showToast.error('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params, reset]);

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('id', projectId);
      formData.append('title', data.title || '');
      formData.append('description', data.description || '');
      formData.append('longDescription', data.longDescription || '');
      formData.append('category', data.category || '');
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('coverImage', data.coverImage || '');
      formData.append('screenshots', JSON.stringify(data.screenshots || []));
      formData.append('liveUrl', data.liveUrl || '');
      formData.append('githubUrl', data.githubUrl || '');
      formData.append('featured', String(data.featured));
      formData.append('status', data.status || 'draft');

      const result = await updateProject(formData);

      if (result.success) {
        showToast.success('Project updated successfully!');
        router.push('/dashboard/projects');
      } else {
        setError(result.error || 'Failed to update project');
        showToast.error(result.error || 'Failed to update project');
      }
    });
  });

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      'tags',
      tags.filter((t: string) => t !== tag)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Project</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Update your project details</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold dark:text-white">Project Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title"
              {...register('title', { required: 'Title is required' })}
              error={errors.title?.message as string | undefined}
              placeholder="My Awesome Project"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={3}
                placeholder="Short description of your project"
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.description.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Description (Optional)
              </label>
              <textarea
                {...register('longDescription')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={5}
                placeholder="Detailed description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.category.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="tag-input"
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addTag(input.value);
                      input.value = '';
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('tag-input') as HTMLInputElement;
                    addTag(input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900 dark:hover:text-blue-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Input
              label="Cover Image URL"
              {...register('coverImage', { required: 'Cover image is required' })}
              error={errors.coverImage?.message as string | undefined}
              placeholder="https://example.com/image.png"
            />

            <Input
              label="Live URL (Optional)"
              {...register('liveUrl')}
              placeholder="https://example.com"
            />

            <Input
              label="GitHub URL (Optional)"
              {...register('githubUrl')}
              placeholder="https://github.com/username/repo"
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('featured')} className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('status')}
                  value="published"
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('status')}
                  value="draft"
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Draft</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Project'}
              </Button>
              <Link href="/dashboard/projects">
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
