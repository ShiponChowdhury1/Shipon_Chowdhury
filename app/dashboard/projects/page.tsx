import { getProjects } from '@/server/actions/project.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteProjectButton } from '@/components/dashboard/delete-project-button';
import { AddProjectModal } from '@/components/dashboard/add-project-modal';

interface Project {
  _id: string;
  coverImage: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  description: string;
  views: number;
}

export default async function ProjectsPage() {
  const result = await getProjects();

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load projects</p>
      </div>
    );
  }

  const projects = result.data as Project[];

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Manage your portfolio projects</p>
          </div>
          <AddProjectModal />
        </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
            <AddProjectModal />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project: Project) => (
            <Card key={project._id} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800">
              <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-700">
                {project.coverImage && (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      project.status === 'published'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {project.views || 0}
                  </span>
                  <span>•</span>
                  <span className="text-blue-600">{project.category}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link href={`/dashboard/projects/edit/${project._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                      <Edit size={14} className="sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </Link>
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                      <ExternalLink size={14} />
                    </Button>
                  </Link>
                  <DeleteProjectButton projectId={project._id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <AddProjectModal />
        </div>
      </div>
    </>
  );
}
