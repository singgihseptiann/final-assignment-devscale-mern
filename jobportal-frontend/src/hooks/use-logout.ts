import { useMutation } from '@tanstack/react-query';
import { createRequest } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useLogout = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: createRequest(`${process.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }),
  });

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync();
      window.location.href = '/login';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      toast({
        title: 'Failed to Log Out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { ...mutation, handleLogout };
};
