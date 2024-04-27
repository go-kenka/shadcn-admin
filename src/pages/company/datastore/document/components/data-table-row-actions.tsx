import { Row } from '@tanstack/react-table';

import DeleteRow from '../form/delete-row';
import UpdateRow from '../form/update-row';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);

  return (
    <div className='flex gap-2'>
      <UpdateRow id={row.getValue('id')} />
      <DeleteRow id={row.getValue('id')} />
    </div>
  );
}
