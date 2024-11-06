// src/hooks/useGetJobList.ts
import { createRequest } from '@/lib/api';
import { TJobHunterApplication, IResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

// Hook to fetch the job list
export const useGetApplicationList = () => {
  return useQuery<IResponse<TJobHunterApplication[]>>({
    queryKey: ['application'],
    queryFn: createRequest<IResponse<TJobHunterApplication[]>>(`${process.env.VITE_API_BASE_URL}/api/v1/applications`, {
      credentials: 'include',
    }),
  });
};
