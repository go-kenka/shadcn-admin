import { Row } from '@tanstack/react-table';

import BindingAdapters from '../binding/index.tsx';
import DeleteMapping from '../form/delete-mapping.tsx';
import UpdateMapping from '../form/update-mapping.tsx';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  return (
    <div className='flex gap-2'>
      <BindingAdapters mid={row.getValue('id')} />
      <UpdateMapping id={row.getValue('id')} />
      <DeleteMapping id={row.getValue('id')} />
    </div>
  );
}
