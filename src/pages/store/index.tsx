import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { useEffect } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useStore } from './store/store.ts';

export default function Stores() {
  const { search, list } = useStore();

  useEffect(() => {
    search(0, '');
  }, []);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div className='flex-1'>
            <h2 className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
              店铺列表
            </h2>
            <p className='text-muted-foreground'>
              店铺主要用于收集已经处理过的数据，用于查询和导出使用。
            </p>
          </div>
          <div className='flex w-[200px] flex-row justify-end space-x-2'></div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={list} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}
