import { useMutation } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { IJobSimple, IResponse } from '@/types';
import { JobStatusType } from '../schema';

export const useUpdateJobStatus = () => {
  const mutation = useMutation<IResponse<IJobSimple>, Error, JobStatusType>({
    mutationKey: ['update-job-status'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<IJobSimple>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/jobs/${payload.jobId}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: payload.status }),
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
