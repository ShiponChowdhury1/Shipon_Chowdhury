'use client';

import { useState, useEffect } from 'react';

interface ProjectFilters {
  category?: string;
  status?: 'draft' | 'published';
  featured?: boolean;
}

export function useProjects(filters?: ProjectFilters) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const { getProjects } = await import('@/server/actions/project.actions');
        const result = await getProjects(filters);

        if (result.success) {
          setProjects(result.data);
        } else {
          setError(result.error || 'Failed to fetch projects');
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [filters]);

  return { projects, isLoading, error };
}
