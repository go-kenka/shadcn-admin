import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData,
>({}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const nav = useNavigate();

  const toSchema = () => {
    nav(`schema`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>查看</DropdownMenuItem>
        <DropdownMenuItem>编辑</DropdownMenuItem>
        <DropdownMenuItem onClick={toSchema}>配置</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          删除
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
