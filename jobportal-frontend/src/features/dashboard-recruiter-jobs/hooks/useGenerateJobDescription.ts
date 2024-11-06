import { z } from 'zod';
import { IResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';

export const JobDescriptionInputSchema = z.object({
  title: z.string().min(2, {
    message: 'Title is required to generate Job Description.',
  }),
  experienceLevel: z.string().min(1, {
    message: 'Experience level is required to generate Job Description.',
  }),
  requiredSkills: z.array(z.string()).min(1, {
    message: 'Skills are required to generate Job Description.',
  }),
});

export type TJobDescriptionInput = z.infer<typeof JobDescriptionInputSchema>;

export const useGenerateJobDescription = () => {
  const mutation = useMutation<IResponse<string>, Error, TJobDescriptionInput>({
    mutationKey: ['generate-job-description'],
    mutationFn: async (payload) => {
      const requestFunc = createRequest<IResponse<string>>(
        `${process.env.VITE_API_BASE_URL}/api/v1/jobs/generate/description`,
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
