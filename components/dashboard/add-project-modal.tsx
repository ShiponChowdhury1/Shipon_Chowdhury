'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectForm } from '@/hooks/use-project-form';
import { createProject } from '@/server/actions/project.actions';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Upload } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { showToast } from '@/lib/toast';

export function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [jsonData, setJsonData] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    watch,
  } = useProjectForm();

  const errors = formState?.errors || {};
  const tags = watch('tags') || [];

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('title', data.title || '');
      formData.append('description', data.description || '');
      formData.append('longDescription', data.longDescription || '');
      formData.append('category', data.category || '');
      formData.append('tags', JSON.stringify(data.tags || []));
      formData.append('coverImage', data.coverImage || '');
      formData.append('screenshots', JSON.stringify(data.screenshots || []));
      formData.append('liveUrl', data.liveUrl || '');
      formData.append('githubUrl', data.githubUrl || '');
      formData.append('featured', String(data.featured || false));
      formData.append('status', data.status || 'published');

      const result = await createProject(formData);

      if (result.success) {
        showToast.success('Project created successfully!');
        reset();
        setOpen(false);
        router.refresh();
      } else {
        showToast.error(result.error || 'Failed to create project');
      }
    });
  });

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setValue('tags', tags.filter((t: string) => t !== tag));
  };

  const loadFromJSON = () => {
    try {
      const parsed = JSON.parse(jsonData);
      setValue('title', parsed.title || '');
      setValue('description', parsed.description || '');
      setValue('longDescription', parsed.longDescription || '');
      setValue('category', parsed.category || '');
      setValue('tags', parsed.tags || []);
      setValue('coverImage', parsed.coverImage || '');
      setValue('screenshots', parsed.screenshots || []);
      setValue('liveUrl', parsed.liveUrl || '');
      setValue('githubUrl', parsed.githubUrl || '');
      setValue('featured', parsed.featured || false);
      setValue('status', parsed.status || 'published');
      setJsonData('');
      showToast.success('Data loaded successfully!');
    } catch {
      showToast.error('Invalid JSON format');
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <Button className="w-full sm:w-auto bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus size={20} className="mr-2" />
          Add Project
        </Button>
      </ModalTrigger>
      <ModalContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new project for your portfolio</p>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* JSON Import Section */}
            <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 items-center gap-2">
                <Upload size={16} />
                Load from JSON (sample-projects.ts data)
              </label>
              <div className="flex gap-2">
                <textarea
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder='Paste JSON object here: { "title": "...", "description": "..." }'
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm"
                  rows={3}
                />
                <Button
                  type="button"
                  onClick={loadFromJSON}
                  disabled={!jsonData.trim()}
                  className="self-start"
                >
                  Load
                </Button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Copy any project object from <code className="bg-white dark:bg-gray-900 px-1 rounded">data/sample-projects.ts</code> and paste here
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Project Title"
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title?.message as string | undefined}
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  rows={3}
                  placeholder="Brief description of your project"
                />
                {errors.description && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.description.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      value="draft"
                      defaultChecked
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Draft</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      value="published"
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Published</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Cover Image URL"
                  {...register('coverImage', { required: 'Cover image is required' })}
                  error={errors.coverImage?.message as string | undefined}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Input
                  label="Live URL (Optional)"
                  {...register('liveUrl')}
                  placeholder="https://myproject.com"
                />
              </div>

              <div>
                <Input
                  label="GitHub URL (Optional)"
                  {...register('githubUrl')}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    id="tag-input-modal"
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
                      const input = document.getElementById('tag-input-modal') as HTMLInputElement;
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

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
                </label>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Project'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
