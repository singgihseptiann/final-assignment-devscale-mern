import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantionStatusSchema, ApplicationStatusType } from '../schema';

export default function useApplicationStatusForm() {
  const form = useForm<ApplicationStatusType>({
    resolver: zodResolver(ApplicantionStatusSchema),
    defaultValues: {
      applicationId: '',
      status: '',
    },
  });

  return form;
}
