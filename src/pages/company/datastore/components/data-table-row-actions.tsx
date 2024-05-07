import { Row } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { IconColumns, IconListDetails } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import DeleteDatastore from '../form/delete-datastore';
import UpdateDatastore from '../form/update-datastore';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const nav = useNavigate();

  const toSchema = () => {
    nav(`datastore/${row.getValue('id')}/schema`);
  };

  const toViews = () => {
    nav(`datastore/${row.getValue('id')}/docs`);
  };

  return (
    <div className='flex gap-2'>
      <Button variant={'outline'} size={'sm'} onClick={toViews}>
        <IconListDetails className='h-4 w-4' />
      </Button>
      {row.getValue('mode') === 1 && (
        <Button variant={'outline'} size={'sm'} onClick={toSchema}>
          <IconColumns className='h-4 w-4' />
        </Button>
      )}
      <UpdateDatastore id={row.getValue('id')} />
      <DeleteDatastore id={row.getValue('id')} />
    </div>
  );
}
