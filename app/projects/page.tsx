import { getProjects } from '@/server/actions/project.actions';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FadeIn } from '@/components/ui/animations';
import { ProjectsClient } from '@/components/projects/projects-client';

export default async function ProjectsPage() {
  const result = await getProjects({ status: 'published' });
  const projects = result.success ? result.data : [];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                All Projects
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4 max-w-3xl mx-auto">
                A collection of UX/UI design and development projects showcasing
                user-centered solutions and technical expertise
              </p>
            </div>
          </FadeIn>

          <ProjectsClient projects={projects} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
