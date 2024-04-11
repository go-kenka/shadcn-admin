import { cn } from '@/lib/utils'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Company } from '../data/company'

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  company: Company
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function CompanyCard({
  company: album,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='overflow-hidden rounded-md'>
            <img
              src={album.cover}
              alt={album.name}
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
          <ContextMenuItem className='hover:!text-red-900'>
            删除
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        <h3 className='font-medium leading-none'>{album.name}</h3>
        <p className='line-clamp-3 text-xs text-muted-foreground hover:text-wrap'>
          {album.desc}
        </p>
      </div>
    </div>
  )
}
