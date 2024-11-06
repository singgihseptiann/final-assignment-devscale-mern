import { z } from 'zod';

export const JobStatusSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  status: z.string().min(1, 'Job new status is required'),
});

export type JobStatusType = z.infer<typeof JobStatusSchema>;
