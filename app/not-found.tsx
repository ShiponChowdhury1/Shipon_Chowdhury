import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="min-w-[150px]">
              Go Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" variant="outline" className="min-w-[150px]">
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
