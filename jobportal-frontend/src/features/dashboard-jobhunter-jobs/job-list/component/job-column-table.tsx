// src/components/job-column-table.tsx
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { APPLICATION_STATUS_LABEL } from '@/constants';
import { TJobHunterApplication } from '@/types';

export const jobColumns: ColumnDef<TJobHunterApplication>[] = [
  {
    accessorKey: 'jobId.title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const {
        jobId: { _id, title },
      } = row.original;
      return (
        <Link to={`/job-vacancy/${_id}`} className="hover:underline">
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: 'jobId.companyId',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Company Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const {
        jobId: {
          companyId: { name },
        },
      } = row.original;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: 'jobId.location',
    header: 'Location',
    cell: ({ row }) => {
      const {
        jobId: { location },
      } = row.original;
      return <div>{location}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Applied Date',
    cell: ({ row }) => <div>{new Date(row.getValue('createdAt')).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{APPLICATION_STATUS_LABEL[row.getValue('status') as string]}</div>,
  },
];












