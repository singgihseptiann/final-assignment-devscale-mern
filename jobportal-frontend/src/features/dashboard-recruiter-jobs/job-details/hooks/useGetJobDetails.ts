import { useQuery } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { IJob, IResponse } from '@/types';

export const useGetJobDetails = (jobId: string) => {
  const query = useQuery({
    queryKey: ['job', jobId],
    queryFn: createRequest<IResponse<IJob>>(`${process.env.VITE_API_BASE_URL}/api/v1/jobs/${jobId}`),
  });

  return query;
};
