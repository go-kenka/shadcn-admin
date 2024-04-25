import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { bo } from '@/wailsjs/go/models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteCompany from '../components/delete-company';
import UpdateCompany from '../components/update-company';
import { useCompanyStore } from '../store/company';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { SearchDatastoreList } from '@/wailsjs/go/service/Datastore';

export default function Datastores() {
  const { cid } = useParams();
  const id = Number(cid);
  const getCy = useCompanyStore(({ get }) => get);
  const [data, setData] = useState<bo.Datastore[]>([]);

  const [cm, setCm] = useState<bo.Company>({});

  useEffect(() => {
    getCy(id).then((res) => {
      setCm(res ?? {});
    });
  }, [cid]);

  useEffect(() => {
    SearchDatastoreList({
      page: {
        num: 1,
        size: 10,
      },
      id: id,
      name: '',
    }).then((res) => {
      setData(res.list || []);
    });
  }, [cm]);

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
            <h2 className='text-2xl font-bold tracking-tight'>
              {cm.name + '（仓库列表）'}
            </h2>
            <p className='text-muted-foreground'>{cm.desc}</p>
          </div>
          <div className='flex w-[200px] flex-row justify-end space-x-2'>
            <DeleteCompany id={id} />
            <UpdateCompany id={id} />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}
