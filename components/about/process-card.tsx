import { Card, CardContent } from '@/components/ui/card';

interface ProcessCardProps {
  process: {
    step: string;
    title: string;
    description: string;
  };
}

export function ProcessCard({ process }: ProcessCardProps) {
  return (
    <Card className="h-full border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="text-5xl font-bold text-blue-600/20 dark:text-blue-400/20 mb-4">
          {process.step}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{process.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {process.description}
        </p>
      </CardContent>
    </Card>
  );
}
