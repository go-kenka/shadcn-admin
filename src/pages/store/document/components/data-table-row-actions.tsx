import { Row } from '@tanstack/react-table';

import { Button } from '@/components/custom/button.tsx';
import { IconSearch } from '@tabler/icons-react';
import DeleteUsage from '@/pages/store/document/form/delete-usage.tsx';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);

  return (
    <div className='flex gap-2'>
      <Button variant='ghost' size='sm' onClick={() => console.log(row)}>
        <IconSearch className={'h-4 w-4'} />
      </Button>
      <DeleteUsage id={row.getValue('id')} />
    </div>
  );
}
