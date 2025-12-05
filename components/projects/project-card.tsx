import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    _id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    coverImage?: string;
    tags: string[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="relative p-[1px] rounded-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full" style={{ background: 'linear-gradient(90deg, #3f1eff, #f459ff, #fc6a93, #fff2a2)' }}>
        <Card className="overflow-hidden h-full bg-white dark:bg-[#111026] border-0">
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {project.coverImage && (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <CardContent className="p-6">
          <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
            <div className="flex items-center font-medium text-sm group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #AD86FF, #789AFF)' }}>View Case Study</span>
              <ArrowRight size={16} className="transition-opacity" style={{ color: '#AD86FF' }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
