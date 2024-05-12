import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { bo } from '@/wailsjs/go/models';
import dayjs from 'dayjs';

export const columns: ColumnDef<bo.Sort>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[120px]'>{row.getValue('id')}</div>,
    meta: { title: 'ID' },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='店铺名称' />
    ),
    cell: ({ row }) => <div className='w-[120px]'>{row.getValue('name')}</div>,
    meta: { title: '店铺名称' },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'desc',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='详细描述' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[400px] space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('desc')}
          </span>
        </div>
      );
    },
    meta: { title: '详细描述' },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='创建时间' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[150px] items-center'>
          <span>
            {dayjs(row.getValue('created_at')).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      );
    },
    meta: { title: '创建时间' },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='更新时间' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[150px] items-center'>
          <span>
            {dayjs(row.getValue('updated_at')).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      );
    },
    meta: { title: '更新时间' },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
