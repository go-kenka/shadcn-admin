import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { bo } from '@/wailsjs/go/models';
import { adapters } from '../../data/data';

export const columns: ColumnDef<bo.Datastore>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='仓库名称' />
    ),
    cell: ({ row }) => <div className='w-[120px]'>{row.getValue('name')}</div>,
    meta: { title: '仓库名称' },
    enableSorting: false,
    enableHiding: false,
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
  },
  {
    accessorKey: 'aid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='适配器' />
    ),
    cell: ({ row }) => {
      const status = adapters.find(
        (status) => status.value === row.getValue('aid')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[150px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: { title: '适配器' },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='创建时间' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[150px] items-center'>
          <span>{row.getValue('created_at')}</span>
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
          <span>{row.getValue('updated_at')}</span>
        </div>
      );
    },
    meta: { title: '创建时间' },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
