import { z } from 'zod';

export const JobApplicationSchema = z.object({
  resumeText: z.string().min(1, { message: 'Resume is required' }),
  skills: z.array(z.string()).min(1, { message: 'Skills are required' }),
  yearOfExperience: z
    .string()
    .min(1, { message: 'Year of experience is required' })
    .transform((val) => +val),
  education: z.string().min(1, 'Education is required'),
});

export type JobApplicationType = z.infer<typeof JobApplicationSchema>;
