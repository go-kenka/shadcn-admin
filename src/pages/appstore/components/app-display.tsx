import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  IconCircleOff,
  IconClipboard,
  IconClock,
  IconCloudDownload,
  IconDotsVertical,
  IconDownload,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react';
import { bo } from '@/wailsjs/go/models.ts';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import Markdown from 'react-markdown';

interface AppDisplayProps {
  app: bo.App | null;
}

export function AppDisplay({ app }: AppDisplayProps) {
  const [selectedVer, setSelectedVer] = useState<bo.AppVersion | null>(null);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center p-2'>
        <div className='flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' disabled={!app}>
                <IconDownload className='h-4 w-4' />
                <span className='sr-only'>安装</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>安装</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' disabled={!app}>
                <IconCircleOff className='h-4 w-4' />
                <span className='sr-only'>禁用</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>禁用</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' disabled={!app}>
                <IconTrash className='h-4 w-4' />
                <span className='sr-only'>卸载</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>卸载</TooltipContent>
          </Tooltip>
          <Separator orientation='vertical' className='mx-1 h-6' />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant='ghost' size='icon' disabled={!app}>
                    <IconClock className='h-4 w-4' />
                    <span className='sr-only'>版本记录</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className='flex w-[535px] p-0'>
                <div className='flex flex-col gap-2 border-r px-2 py-4'>
                  <div className='px-4 text-sm font-medium'>版本变更日志</div>
                  <div className='grid min-w-[250px] gap-1'>
                    {app?.detail.version_list.map((ver: bo.AppVersion) => (
                      <Button
                        variant='ghost'
                        className='justify-start font-normal'
                        onClick={() => setSelectedVer(ver)}
                      >
                        {ver.version}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className='p-2'>
                  {selectedVer && (
                    <div>
                      <p className='text-xs font-medium text-muted-foreground'>
                        {dayjs(selectedVer.publish_time).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      </p>
                      <p>{selectedVer.changelog}</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>版本记录</TooltipContent>
          </Tooltip>
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' disabled={!app}>
                <IconClipboard className='h-4 w-4' />
                <span className='sr-only'>复制ID</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>复制ID</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation='vertical' className='mx-2 h-6' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' disabled={!app}>
              <IconDotsVertical className='h-4 w-4' />
              <span className='sr-only'>更多</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>评分</DropdownMenuItem>
            <DropdownMenuItem>分享</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {app ? (
        <div className='flex w-full flex-1 flex-col'>
          <div className='flex w-full items-start p-4'>
            <div className='flex w-full items-start gap-4 text-sm'>
              <img src={app.icon} className='h-[60px] w-[100px]' />
              <div className='grid w-full gap-1'>
                <div className='flex w-full items-center justify-between'>
                  <div className='font-semibold'>
                    {app.name} <Badge variant={'outline'}>v{app.version}</Badge>
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {dayjs(app.last_publish_time).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </div>
                <div className='flex w-[300px] items-center gap-2'>
                  <div className='flex  items-center gap-2'>
                    <a href={app.publisher.home_page} className='text-blue-400'>
                      {app.publisher.publisher_name}
                    </a>
                    {app.publisher.certified && (
                      <Badge variant='outline' className='text-orange-500'>
                        官方认证
                      </Badge>
                    )}
                  </div>
                  <div className='flex  items-center gap-2'>
                    <IconCloudDownload className={'h-4 w-4'} />
                    {app.stats.install_total}
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconStarFilled className={'h-4 w-4 text-yellow-500'} />
                    {app.stats.rating}
                  </div>
                </div>
                <div className='line-clamp-1 text-xs'>{app.desc}</div>
              </div>
            </div>
          </div>
          <Separator className='mt-auto' />
          <div className='flex flex-1 flex-row '>
            <Tabs defaultValue='overview' className='flex-1 p-4'>
              <TabsList className='grid w-[200px] grid-cols-2'>
                <TabsTrigger value='overview'>细节</TabsTrigger>
                <TabsTrigger value='changelog'>变更日志</TabsTrigger>
              </TabsList>
              <TabsContent value='overview'>
                <Markdown>{app.detail.detail}</Markdown>
              </TabsContent>
              <TabsContent value='changelog'>
                {app?.detail.version_list.map((ver: bo.AppVersion) => (
                  <div key={ver.version}>
                    <p className='text-xs font-medium text-muted-foreground'>
                      v{ver.version} -{' '}
                      {dayjs(ver.publish_time).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                    <p>{ver.changelog}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
            <Separator orientation='vertical' />
            <div className='w-[300px] p-4'>
              <div className='mb-4 mt-4 flex w-full flex-col justify-start gap-2'>
                <Label className='text-muted-foreground'>类别</Label>
                <div className='flex flex-row flex-wrap gap-2'>
                  <Badge variant='default'>{app.category}</Badge>
                </div>
              </div>
              <Separator orientation='horizontal' />
              <div className='mb-4 mt-4 flex w-full flex-col justify-start gap-2'>
                <Label className='text-muted-foreground'>标签🏷</Label>
                <div className='flex flex-row flex-wrap gap-2'>
                  {app.tags.map((tag) => (
                    <Badge variant='outline'>{tag}</Badge>
                  ))}
                </div>
              </div>
              <Separator orientation='horizontal' />
              <div className='mb-4 mt-4 flex w-full flex-col justify-start gap-2'>
                <Label className='text-muted-foreground'>资源</Label>
                <div className='flex flex-col flex-wrap gap-2'>
                  {/* 进入商店 */}
                  <a
                    href={'#'}
                    target='_blank'
                    className='text-sm text-blue-600'
                  >
                    进入商店
                  </a>
                  {/* 问题反馈 */}
                  <a
                    href={'#'}
                    target='_blank'
                    className='text-sm text-blue-600'
                  >
                    问题反馈
                  </a>
                  {/* 仓库地址 */}
                  <a
                    href={app.repository}
                    target='_blank'
                    className='text-sm text-blue-600'
                  >
                    仓库地址
                  </a>

                  {/* 插件主页 */}
                  <a
                    target='_blank'
                    href={app.publisher.home_page}
                    className='text-sm text-blue-600'
                  >
                    插件主页
                  </a>
                </div>
              </div>
              <Separator orientation='horizontal' />
              <div className='mb-4 mt-4 flex w-full flex-col justify-start gap-2'>
                <Label className='text-muted-foreground'>详细信息</Label>
                <div className='flex flex-col flex-wrap gap-2'>
                  {/* 插件ID */}
                  <div className='flex flex-row items-center gap-2 rounded border p-2'>
                    <IconClock className='h-4 w-4 text-muted-foreground' />
                    <span className='w-[80px] text-xs'>插件ID：</span>
                    <div className='text-xs text-muted-foreground'>
                      {app.id}
                    </div>
                  </div>
                  {/* 发布时间 */}
                  <div className='flex flex-row items-center gap-2 rounded border p-2'>
                    <IconClock className='h-4 w-4 text-muted-foreground' />
                    <span className='w-[80px] text-xs'>发布时间：</span>
                    <div className='text-xs text-muted-foreground'>
                      {dayjs(app.last_publish_time).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    </div>
                  </div>
                  {/* 上传时间 */}
                  <div className='flex flex-row items-center gap-2 rounded border p-2'>
                    <IconClock className='h-4 w-4 text-muted-foreground' />
                    <span className='w-[80px] text-xs'>上传时间：</span>
                    <div className='text-xs text-muted-foreground'>
                      {dayjs(app.start_publish_time).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    </div>
                  </div>

                  {/* 分类 */}
                  <div className='flex flex-row items-center gap-2 rounded border p-2'>
                    <IconClock className='h-4 w-4 text-muted-foreground' />
                    <span className='w-[80px] text-xs'>分类：</span>
                    <div className='text-xs text-muted-foreground'>
                      {app.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>
          暂无应用信息
        </div>
      )}
    </div>
  );
}
