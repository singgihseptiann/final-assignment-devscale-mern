import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IJob } from '@/types';
import { JobFormSchema, JobFormSchemaType } from '../schema/job';

export function useUpdateJobForm(jobDetails?: IJob) {
  const form = useForm<JobFormSchemaType>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      userId: '',
      companyId: '',
      title: '',
      experienceLevel: '',
      requiredSkills: [],
      description: '',
      type: '',
      placementType: '',
      location: '',
      status: '',
    },
  });

  React.useEffect(() => {
    if (jobDetails) {
      const {
        userId,
        companyId,
        title,
        experienceLevel,
        requiredSkills,
        description,
        type,
        placementType,
        location,
        status,
      } = jobDetails;

      form.reset({
        userId,
        companyId: companyId._id,
        title,
        experienceLevel,
        requiredSkills,
        description,
        type,
        placementType,
        location,
        status,
      });
    }
  }, [form, jobDetails]);

  return form;
}
