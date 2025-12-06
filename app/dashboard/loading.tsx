export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}
