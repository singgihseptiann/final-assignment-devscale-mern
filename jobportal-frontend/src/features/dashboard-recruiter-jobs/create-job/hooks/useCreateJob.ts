import { useMutation } from '@tanstack/react-query';
import { IJobSimple, IResponse } from '@/types';
import { JobFormSchemaType } from '../schema/job';
import { createRequest } from '@/lib/api';

export const useCreateJob = () => {
  const mutation = useMutation<IResponse<IJobSimple>, Error, JobFormSchemaType>({
    mutationKey: ['create-job'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<IJobSimple>>(`${process.env.VITE_API_BASE_URL}/api/v1/jobs`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return requestFunc();
    },
  });

  return mutation;
};
