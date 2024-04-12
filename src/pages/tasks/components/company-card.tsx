import { cn } from '@/lib/utils'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { bo } from '@/wailsjs/go/models'

interface CompanyProps extends React.HTMLAttributes<HTMLDivElement> {
  company: bo.Company
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function CompanyCard({
  company: cm,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: CompanyProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='overflow-hidden rounded-md'>
            <img
              src={'http://iph.href.lu/300x300?bg=eeeeee'}
              alt={cm.name}
              width={width}
              height={height}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-40'>
          <ContextMenuItem>查看</ContextMenuItem>
          <ContextMenuItem>编辑</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className='hover:!text-red-700'>
            删除
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        <h3 className='font-medium leading-none'>{cm.name}</h3>
        <p className='line-clamp-3 text-xs text-muted-foreground hover:text-wrap'>
          {cm.desc}
        </p>
      </div>
    </div>
  )
}
