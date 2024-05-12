import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { IconArrowLeft } from '@tabler/icons-react';
import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getColumns } from './components/columns.tsx';
import { DataTable } from './components/data-table.tsx';
import { useStore } from '../store/store.ts';
import { bo } from '@/wailsjs/go/models.ts';
import { useUsageStore } from './store/usage.ts';

interface DocumentsProps {}

const Documents: FC<DocumentsProps> = () => {
  const { sid } = useParams();
  const id = Number(sid);
  const navigate = useNavigate();
  const { get } = useStore();
  const { list } = useUsageStore();
  const [store, setStore] = useState<bo.Store | undefined>();

  useEffect(() => {
    if (id) {
      get(id).then((s) => {
        if (s) {
          setStore(s);
        }
      });
    }
  }, [id]);

  const back = () => {
    navigate(-1);
  };
  return (
    <>
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
                <IconArrowLeft onClick={back} className='cursor-pointer' />{' '}
                {store?.name + '（使用记录）'}
              </h2>
              <p className='text-muted-foreground'>{store?.desc}</p>
            </div>
            <div className='flex w-[200px] flex-row justify-end space-x-2'></div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={list} columns={getColumns()} />
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
};

export default Documents;
