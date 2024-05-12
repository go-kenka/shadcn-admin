import { Row } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { IconListDetails } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import DeleteStore from '../form/delete-store.tsx';
import UpdateStore from '../form/update-store.tsx';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const nav = useNavigate();

  const toViews = () => {
    nav(`/store/${row.getValue('id')}/docs`);
  };

  return (
    <div className='flex gap-2'>
      <Button variant={'outline'} size={'sm'} onClick={toViews}>
        <IconListDetails className='h-4 w-4' />
      </Button>
      <UpdateStore id={row.getValue('id')} />
      <DeleteStore id={row.getValue('id')} />
    </div>
  );
}
