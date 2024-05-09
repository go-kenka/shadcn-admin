import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { bo } from '@/wailsjs/go/models';
import { GetDatastoreMenus } from '@/wailsjs/go/service/Datastore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateRow from '../form/create-row';
import { DataTableViewOptions } from './data-table-view-options';
import { MenuBar } from './menubar';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { did } = useParams();
  const [menus, setMenus] = useState<bo.Menu[]>([]);

  useEffect(() => {
    if (did) {
      GetDatastoreMenus(Number(did)).then((menus) => {
        console.log(menus);
        setMenus(menus.menus || []);
      });
    }
  }, [did]);

  const selected = table.getFilteredSelectedRowModel().rows.length === 0;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='全文检索'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('id')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {/* <div className='flex gap-x-2'>
          {table.getColumn('aid') && (
            <DataTableFacetedFilter
              column={table.getColumn('aid')}
              title='适配器'
              options={adapters}
            />
          )}
        </div> */}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            重置
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex gap-2'>
        <MenuBar items={menus} disabled={selected} />
        <CreateRow />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
