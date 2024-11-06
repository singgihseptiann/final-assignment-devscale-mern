import React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/shared/auth-provider';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();

  const [searchParams] = useSearchParams();

  const { toast } = useToast();

  React.useEffect(() => {
    const error = Boolean(searchParams.get('error'));
    const message = searchParams.get('message');

    if (error) {
      toast({
        title: 'Login failed!',
        description: message,
        variant: 'destructive',
      });

      alert(`Login failed! ${message}`);
    }
  }, [searchParams, toast]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="mx-auto mt-16 h-[60vh] w-2/6">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Choose your role!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form action={`${process.env.VITE_API_BASE_URL}/api/v1/auth/register/recruiter`} method="POST">
            <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-400">
              Register as Recruiter
            </Button>
          </form>
          <form action={`${process.env.VITE_API_BASE_URL}/api/v1/auth/register/job_hunter`} method="POST">
            <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-400">
              Register as Job Hunter
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-secondary-500">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
