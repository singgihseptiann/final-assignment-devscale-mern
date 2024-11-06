import { z } from 'zod';

export const JobFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  experienceLevel: z.string().min(1, {
    message: 'Experience level is required.',
  }),
  requiredSkills: z.array(z.string()).min(1, {
    message: 'Skills are required.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long.',
  }),
  type: z.string().min(1, 'Job type is required'),
  placementType: z.string().min(1, 'Placement type is required.'),
  location: z.string().optional(),
  status: z.string().min(1, 'Status is required.'),
});

export type JobFormSchemaType = z.infer<typeof JobFormSchema>;
