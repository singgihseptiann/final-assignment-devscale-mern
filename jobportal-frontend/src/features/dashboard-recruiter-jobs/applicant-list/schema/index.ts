import { z } from 'zod';

export const ApplicantionStatusSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  status: z.string().min(1, 'Application new status is required'),
});

export type ApplicationStatusType = z.infer<typeof ApplicantionStatusSchema>;
