import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const JobDetailSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4">
        <Skeleton className="h-24 w-24" />
        <section className="flex flex-auto flex-col gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-12 w-full" />
        </section>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col gap-4">
        <Skeleton className="h-[45vh] w-full" />
      </CardContent>
    </Card>
  );
};
