import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { bo } from '@/wailsjs/go/models';
import { IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompanyStore } from '../store/company';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useDataStore } from './store/datastore';

export default function Datastores() {
  const { cid } = useParams();
  const id = Number(cid);
  const { get } = useCompanyStore();
  const { search, ds } = useDataStore();
  const navigate = useNavigate();

  const [cm, setCm] = useState<bo.Company>({});

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    get(id).then((res) => {
      setCm(res ?? {});
    });
  }, [cid]);

  useEffect(() => {
    search(id, '');
  }, [id]);

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
              <IconArrowLeft onClick={back} className='cursor-pointer' />{' '}
              {cm.name + '（仓库列表）'}
            </h2>
            <p className='text-muted-foreground'>{cm.desc}</p>
          </div>
          <div className='flex w-[200px] flex-row justify-end space-x-2'></div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={ds} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}
