import { useQuery } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { ICompany, IResponse } from '@/types';

export const useGetUserCompany = () => {
  const query = useQuery({
    queryKey: ['get-user-company'],
    queryFn: createRequest<IResponse<ICompany>>(`${process.env.VITE_API_BASE_URL}/api/v1/users/company`, {
      credentials: 'include',
    }),
  });

  return query;
};
