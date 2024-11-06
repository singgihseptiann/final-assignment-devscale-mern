import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { ICompany, inputCompanySchema, IResponse, TInputCompany } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';

export const useUpdateCompany = (data?: ICompany) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const mutation = useMutation<IResponse<ICompany>, Error, TInputCompany>({
    mutationKey: ['update-company'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<ICompany>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/companies/${data?._id}`,
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

  const form = useForm<TInputCompany>({
    resolver: zodResolver(inputCompanySchema),
    defaultValues: {
      userId: '',
      name: '',
      location: '',
      industry: '',
      description: '',
      logo: '',
    },
  });

  React.useEffect(() => {
    if (data) {
      const { userId, name, location, industry, description, logo } = data;
      form.reset({ userId, name, location, industry, description, logo });
    }
  }, [data, form]);

  const handleUpdateCompany = async (formValue: TInputCompany) => {
    try {
      await mutation.mutateAsync(formValue);

      toast({
        title: 'Successs!',
        description: 'Successfully update company details',
      });

      queryClient.invalidateQueries({ queryKey: ['get-user-company'] });

      const queryParams = new URLSearchParams();
      queryParams.delete('edit');
      setSearchParams(queryParams);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { mutation, form, handleSubmit: form.handleSubmit(handleUpdateCompany) };
};
