import { IResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { JobApplicationType } from '../schema';
import { createRequest } from '@/lib/api';

export const useApplyJob = (jobId: string) => {
  const mutation = useMutation<IResponse<null>, Error, JobApplicationType>({
    mutationKey: ['apply-job', jobId],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<null>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/jobs/${jobId}/apply`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      return requestFunc();
    },
  });

  return mutation;
};
