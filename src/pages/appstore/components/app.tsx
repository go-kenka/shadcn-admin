'use client';

import { Input } from '@/components/ui/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppDisplay } from './app-display.tsx';
import { AppList } from './app-list.tsx';
import { useApp } from '@/pages/appstore/store/app.ts';
import { useEffect, useState } from 'react';

interface AppProps {
  defaultLayout: number[] | undefined;
}

export function App({ defaultLayout = [300, 655] }: AppProps) {
  const { list, selected, search } = useApp();
  const [key, setKey] = useState('');

  useEffect(() => {
    search(key);
  }, [key]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className='h-full max-h-[100vh] items-stretch'
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Tabs defaultValue='all'>
            <div className='flex items-center px-4 py-2'>
              <h1 className='text-xl font-bold'>插件中心</h1>
              <TabsList className='ml-auto'>
                <TabsTrigger
                  value='all'
                  className='text-zinc-600 dark:text-zinc-200'
                >
                  所有
                </TabsTrigger>
                <TabsTrigger
                  value='unread'
                  className='text-zinc-600 dark:text-zinc-200'
                >
                  已安装
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className='bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
              <form>
                <div className='relative'>
                  {/* <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' /> */}
                  <Input
                    placeholder='Search'
                    className='pl-8'
                    onChange={(e) => setKey(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <TabsContent value='all' className='m-0'>
              <AppList items={list} />
            </TabsContent>
            <TabsContent value='unread' className='m-0'>
              <AppList items={list.filter((item) => !item.installed)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <AppDisplay
            app={list.find((item) => item.id === selected?.id) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
