import { createRequest } from '@/lib/api';
import { IJob, IResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

// Hook to fetch the job list
export const useGetJobDetail = () => {
  return useQuery<IResponse<IJob[]>>({
    queryKey: ['application'],
    queryFn: createRequest<IResponse<IJob[]>>(`${process.env.VITE_API_BASE_URL}/api/v1/applications/:jobId`),
  });
};
