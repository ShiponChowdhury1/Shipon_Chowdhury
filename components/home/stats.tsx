import { SlideIn } from '@/components/ui/animations';

const stats = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Years Experience', value: '5+' },
];

export function Stats() {
  return (
    <SlideIn direction="up" delay={0.4}>
      <div className="flex flex-wrap gap-8 pt-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </SlideIn>
  );
}
