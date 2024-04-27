import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import Loader from '@/components/loader';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { IconArrowLeft } from '@tabler/icons-react';
import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getColumns } from './components/columns';
import { DataTable } from './components/data-table';
import { useDocumentStore } from './store/row';

interface DocumentsProps {}

const Documents: FC<DocumentsProps> = () => {
  const { did } = useParams();
  const id = Number(did);
  const navigate = useNavigate();
  const { rows, fields, init, datastore, loading } = useDocumentStore();

  useEffect(() => {
    console.log('did:', rows);
    init(id);
  }, [did]);

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
                {datastore?.name + '（文档中心）'}
              </h2>
              <p className='text-muted-foreground'>{datastore?.desc}</p>
            </div>
            <div className='flex w-[200px] flex-row justify-end space-x-2'></div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            {loading ? (
              <Loader />
            ) : (
              <DataTable data={rows} columns={getColumns(fields)} />
            )}
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
};

export default Documents;
