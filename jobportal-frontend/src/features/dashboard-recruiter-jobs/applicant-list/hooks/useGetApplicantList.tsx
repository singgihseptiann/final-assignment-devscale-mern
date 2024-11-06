import { createRequest } from '@/lib/api';
import { IApplication, IResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetApplicantList = (jobId: string) => {
  const query = useQuery({
    queryKey: ['applications', jobId],
    queryFn: createRequest<IResponse<IApplication[]>>(
      `${process.env.VITE_API_BASE_URL}/api/v1/jobs/${jobId}/applications`,
      {
        credentials: 'include',
      },
    ),
  });

  return query;
};
