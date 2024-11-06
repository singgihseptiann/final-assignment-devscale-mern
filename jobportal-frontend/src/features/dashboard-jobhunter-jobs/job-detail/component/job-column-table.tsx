import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOB_STATUS_LABEL } from '@/constants';
import { IJob } from '@/types';

export const jobColumns: ColumnDef<IJob>[] = [
  {
    accessorKey: 'company.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Company Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('company.name')}</div>,
  },
  {
    accessorKey: 'company.location',
    header: 'Location',
    cell: ({ row }) => <div>{row.getValue('company.location')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{JOB_STATUS_LABEL[row.getValue('status') as string] ?? '-'}</div>,
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied Date',
    cell: ({ row }) => <div>{new Date(row.getValue('appliedDate')).toLocaleDateString()}</div>,
  },
  {
    id: 'resume',
    header: 'Upload Resume',
    cell: () => (
      <Button className="bg-primary-500 hover:bg-primary-400 text-primary-100">
        Upload Resume
      </Button>
    ),
  },
];
