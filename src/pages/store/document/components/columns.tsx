import { Checkbox } from '@/components/ui/checkbox';
import { bo } from '@/wailsjs/go/models';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { fields } from '../data/fields.ts';

export const getColumns = (): ColumnDef<bo.Usage>[] => [
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
  ...fields.map((field): ColumnDef<bo.Row> => {
    return {
      id: field.key,
      accessorFn: (row) => `${row.data![field.key]}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field.name} />
      ),
      cell: ({ row }) => (
        <div className={`line-clamp-1 w-[100px]`}>
          {row.getValue(field.key)}
        </div>
      ),
      meta: { title: field.name },
      enableSorting: false,
      enableHiding: true,
      enableResizing: true,
    };
  }),
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
