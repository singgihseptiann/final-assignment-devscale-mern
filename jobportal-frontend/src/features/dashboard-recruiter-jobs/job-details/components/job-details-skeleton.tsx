import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const JobDetailsSkeleton = () => {
  return (
    <Card className="border-primary-500 pt-6">
      <CardContent className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
        </section>
        <section className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
        </section>
        <section className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
        </section>
        <section className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
        </section>
        <section className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-48 w-full" />
        </section>
      </CardContent>
    </Card>
  );
};
