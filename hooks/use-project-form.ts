'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';

interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  coverImage: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'draft' | 'published';
}

export function useProjectForm(initialData?: Partial<ProjectFormData>) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    defaultValues: initialData || {
      title: '',
      description: '',
      longDescription: '',
      category: '',
      tags: [],
      coverImage: '',
      screenshots: [],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      status: 'published',
    },
  });

  return {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    isPending,
    startTransition,
    error,
    setError,
  };
}
