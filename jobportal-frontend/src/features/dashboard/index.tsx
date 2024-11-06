import { useAuth } from '@/components/shared/auth-provider';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome {user?.name}!</h1>
    </div>
  );
}
