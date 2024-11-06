import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CompanyCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-12 w-full" />
      </CardHeader>
      <CardContent className="gap2 flex">
        <section className="flex w-1/4 justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
        </section>
        <section className="flex flex-auto flex-col gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </section>
      </CardContent>
    </Card>
  );
};
