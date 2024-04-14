import { Button } from '@/components/custom/button';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import { IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { CompanyCard } from './components/company-card';
import { useCompanyStore } from './store/company';

export default function CompanyList() {
  const list = useCompanyStore((state) => state.cms);
  const search = useCompanyStore((state) => state.search);

  useEffect(() => {
    search('');
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
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>供应商</h2>
            <p className='text-muted-foreground'>
              当前共有 {list.length} 个供应商
            </p>
          </div>
          <div>
            <Button>
              <IconPlus className='mr-2 w-5' /> 添加
            </Button>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='relative'>
          <ScrollArea className='h-[700px]'>
            <div className='flex flex-wrap gap-4  pb-4'>
              {list.map((cm) => (
                <CompanyCard
                  key={cm.id}
                  company={cm}
                  className='w-[150px] shrink-0'
                  aspectRatio='square'
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </div>
      </LayoutBody>
    </Layout>
  );
}
