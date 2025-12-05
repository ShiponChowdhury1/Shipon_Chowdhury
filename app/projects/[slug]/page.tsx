import { getProjectBySlug, incrementClicks } from '@/server/actions/project.actions';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, SlideIn } from '@/components/ui/animations';
import { ExternalLink, Github, ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const result = await getProjectBySlug(resolvedParams.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft size={20} className="mr-2" />
                Back to Projects
              </Button>
            </Link>
          </FadeIn>

          <SlideIn direction="up" delay={0.1}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 rounded-full text-sm font-bold flex items-center gap-1">
                    ⭐ Featured Project
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                  <Eye size={16} />
                  {project.views} views
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl">
                {project.description}
              </p>

              <div className="flex gap-4 flex-wrap">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={async () => {
                        'use server';
                        await incrementClicks(project.slug);
                      }}
                    >
                      <ExternalLink size={20} className="mr-2" />
                      View Live Project
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-2">
                      <Github size={20} className="mr-2" />
                      View Source Code
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <div className="mb-16 -mx-4 sm:mx-0">
              <Card className="overflow-hidden rounded-none sm:rounded-2xl shadow-2xl">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  {project.coverImage && (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </Card>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <SlideIn direction="up" delay={0.3}>
                <div>
                  <div className="mb-6">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">Overview</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                      About This Project
                    </h2>
                  </div>
                  <Card className="border-l-4 border-blue-600">
                    <CardContent className="p-6 md:p-8">
                      <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.longDescription ? (
                          <p className="whitespace-pre-line text-base md:text-lg">{project.longDescription}</p>
                        ) : (
                          <p className="text-base md:text-lg">{project.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SlideIn>

              {project.screenshots && project.screenshots.length > 0 && (
                <SlideIn direction="up" delay={0.4}>
                  <Card className="mt-8">
                    <CardContent>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Screenshots</h2>
                      <div className="space-y-4">
                        {project.screenshots.map((screenshot: string, index: number) => (
                          <div key={index} className="relative h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                            <Image
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>
              )}
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 h-fit">
              <SlideIn direction="left" delay={0.3}>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-600 rounded"></div>
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold border border-blue-200 dark:border-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              <SlideIn direction="left" delay={0.4}>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-purple-600 rounded"></div>
                      Project Links
                    </h3>
                    <div className="space-y-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                        >
                          <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Live Website</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                        >
                          <Github size={18} className="group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Source Code</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              <SlideIn direction="left" delay={0.5}>
                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      Like this project?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Let's work together on your next idea
                    </p>
                    <Link href="/#contact">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get in Touch
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
