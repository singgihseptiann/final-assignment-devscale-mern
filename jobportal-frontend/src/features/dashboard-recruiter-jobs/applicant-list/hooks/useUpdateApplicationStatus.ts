import { useMutation } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { IApplicationSimple, IResponse } from '@/types';
import { ApplicationStatusType } from '../schema';

export const useUpdateApplicationStatus = () => {
  const mutation = useMutation<IResponse<IApplicationSimple>, Error, ApplicationStatusType>({
    mutationKey: ['update-application-status'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<IApplicationSimple>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/applications/${payload.applicationId}/status`,
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
