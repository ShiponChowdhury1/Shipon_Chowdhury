'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from './project-card';
import { AnimatedCard } from '@/components/ui/animations';
import { Code } from 'lucide-react';

interface ProjectsSectionProps {
  projects: any[];
}

const categories = ['All', 'Dashboard', 'Web App', 'Landing Page', 'E-commerce', 'Full Stack', 'API'];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter((project: any) => project.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Portfolio"
          title="All Projects"
          description="Showcasing my full-stack development work and technical skills"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#AD86FF] to-[#789AFF] text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Code size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No projects found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any, index: number) => (
              <AnimatedCard key={project._id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
