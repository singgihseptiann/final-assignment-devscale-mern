import { useQuery } from '@tanstack/react-query';

import { getDataJobs, getDataJobsById } from '../api/jobsApi';

import { IResponse } from '@/types';
import { IJob } from '@/types/entity';

export function useGetJobs() {
  return useQuery<IResponse<IJob[]>>({
    queryKey: ['jobs'],
    queryFn: getDataJobs,
  });
}

export function useGetJobById(id: string) {
  return useQuery<IResponse<IJob>>({
    queryKey: ['job', id],
    queryFn: getDataJobsById(id),
  });
}
