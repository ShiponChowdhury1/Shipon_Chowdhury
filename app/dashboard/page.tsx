import { getAnalytics } from '@/server/actions/project.actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeIn, AnimatedCard } from '@/components/ui/animations';
import { Eye, MousePointerClick, FolderKanban, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const result = await getAnalytics();

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load analytics</p>
      </div>
    );
  }

  const { totalProjects, totalViews, totalClicks, recentProjects, topProjects } = result.data || {
    totalProjects: 0,
    totalViews: 0,
    totalClicks: 0,
    recentProjects: [],
    topProjects: []
  };

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Views',
      value: totalViews,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Total Clicks',
      value: totalClicks,
      icon: MousePointerClick,
      color: 'bg-purple-500',
    },
    {
      label: 'Engagement Rate',
      value: totalViews > 0 ? `${Math.round((totalClicks / totalViews) * 100)}%` : '0%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <FadeIn>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Welcome back! Here&apos;s your portfolio overview.</p>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard key={stat.label} delay={index * 0.1}>
              <Card className="dark:bg-gray-800">
                <CardContent className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Recent Projects */}
      <AnimatedCard delay={0.4}>
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold dark:text-white">Recent Projects</h2>
              <Link
                href="/dashboard/projects"
                className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet</p>
              ) : (
                recentProjects.map((project: { _id: string; title: string; category: string; views: number; status: string }) => (
                  <div
                    key={project._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-2 sm:gap-0"
                  >
                    <div>
                      <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {project.views}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>

      {/* Top Projects */}
      <AnimatedCard delay={0.5}>
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <h2 className="text-lg sm:text-xl font-bold dark:text-white">Top Performing Projects</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {topProjects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data yet</p>
              ) : (
                topProjects.map((project: { _id: string; title: string; category: string; views: number }, index: number) => (
                  <div
                    key={project._id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gray-400 dark:text-gray-500 w-6 sm:w-8">#{index + 1}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{project.views}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">views</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>
    </div>
  );
}
