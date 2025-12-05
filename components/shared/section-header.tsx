import { FadeIn } from '@/components/ui/animations';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
          {badge}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </FadeIn>
  );
}
