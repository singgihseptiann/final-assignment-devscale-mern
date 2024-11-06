import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const JobListSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex gap-4 pt-6">
        <Skeleton className="h-16 w-16" />
        <section className="flex flex-auto flex-col gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-12 w-full" />
        </section>
      </CardContent>
    </Card>
  );
};
