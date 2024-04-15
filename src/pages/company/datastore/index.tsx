import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { bo } from '@/wailsjs/go/models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteCompany from '../components/delete-company';
import UpdateCompany from '../components/update-company';
import { datastores } from '../data/datastore';
import { useCompanyStore } from '../store/company';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function Datastores() {
  const { cid } = useParams();
  const id = Number(cid);
  const getCy = useCompanyStore(({ get }) => get);

  const [cm, setCm] = useState<bo.Company>({});

  useEffect(() => {
    getCy(id).then((res) => {
      setCm(res ?? {});
    });
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
            <h2 className='text-2xl font-bold tracking-tight'>
              {cm.name + '（仓库列表）'}
            </h2>
            <p className='text-muted-foreground'>{cm.desc}</p>
          </div>
          <div className='space-x-2'>
            <DeleteCompany id={id} />
            <UpdateCompany id={id} />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={datastores} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}
