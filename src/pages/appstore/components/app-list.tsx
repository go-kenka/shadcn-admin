import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/pages/appstore/store/app.ts';
import { bo } from '@/wailsjs/go/models.ts';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { IconCloudDownload, IconStarFilled } from '@tabler/icons-react';
import { Button } from '@/components/custom/button.tsx';

interface AppListProps {
  items: bo.App[];
}

export function AppList({ items }: AppListProps) {
  const { selected, select } = useApp();
  return (
    <ScrollArea className='h-screen'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              selected?.id === item.id && 'bg-muted'
            )}
            onClick={() => select(item.id)}
          >
            <div className='flex w-full flex-row items-center gap-2'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col gap-1'>
                <div className='flex w-full items-center'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='flex-1 font-semibold'>{item.name}</div>
                    <div className='flex items-center gap-2'>
                      <IconCloudDownload className={'h-4 w-4'} />
                      {item.stats.install_total}
                    </div>
                    <div className='flex items-center gap-2'>
                      <IconStarFilled className={'h-4 w-4 text-yellow-500'} />
                      {item.stats.rating}
                    </div>
                  </div>
                </div>
                <div className='text-xs font-medium'>{item.version}</div>
              </div>
            </div>
            <div className='line-clamp-2 text-sm text-muted-foreground'>
              {item.desc}
            </div>
            <div className='flex w-full items-center gap-2'>
              <div className='flex flex-1 items-center gap-2 text-xs text-muted-foreground'>
                {item.publisher.publisher_name}
                {item.publisher.certified && (
                  <Badge variant='outline' className='text-orange-500'>
                    官方认证
                  </Badge>
                )}
              </div>
              <div className='flex items-center gap-2'>
                {!item.installed && (
                  <Button variant='outline' size='sm'>
                    安装
                  </Button>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
