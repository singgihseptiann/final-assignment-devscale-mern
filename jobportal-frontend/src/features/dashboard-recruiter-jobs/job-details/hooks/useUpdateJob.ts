import { useMutation } from '@tanstack/react-query';
import { IJobSimple, IResponse } from '@/types';
import { JobFormSchemaType } from '../../create-job/schema/job';
import { createRequest } from '@/lib/api';

export const useUpdateJob = (jobId: string) => {
  const mutation = useMutation<IResponse<IJobSimple>, Error, JobFormSchemaType>({
    mutationKey: ['update-job'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<IJobSimple>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/jobs/${jobId}`,
        {
          method: 'PUT',
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
