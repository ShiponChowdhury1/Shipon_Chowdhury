'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animations';
import { Button } from '@/components/ui/button';
import { Filter, ExternalLink, Github, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/constants';

export function ProjectsClient({ projects }: { projects: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORIES];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <>
      {/* Filter Component */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`
                rounded-full px-6 py-2 transition-all duration-300
                ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                    : 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Filter size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">No projects available yet</p>
          <p className="text-gray-400 text-sm">Check back soon for new work!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project: any, index: number) => (
            <AnimatedCard key={project._id} delay={index * 0.05}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group h-full border-2 border-transparent hover:border-blue-500/20 bg-white dark:bg-gray-800">
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    {project.coverImage && (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {project.liveUrl && (
                          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-900 flex items-center gap-1">
                            <ExternalLink size={12} />
                            <span>Live</span>
                          </div>
                        )}
                        {project.githubUrl && (
                          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-900 flex items-center gap-1">
                            <Github size={12} />
                            <span>Code</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {project.category}
                      </div>
                      {project.featured && (
                        <div className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white flex items-center gap-1">
                      <Eye size={12} />
                      {project.views || 0}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      )}
    </>
  );
}
