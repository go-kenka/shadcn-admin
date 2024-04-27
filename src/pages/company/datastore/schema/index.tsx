import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { bo } from '@/wailsjs/go/models';
import { IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataStore } from '../store/datastore';
import SchemaEditor from './components/schema-editor';
import useWidgetStore from './components/store/inputs';

export default function Schema() {
  const { did } = useParams();
  const id = Number(did);
  const get = useDataStore(({ get }) => get);
  const navigate = useNavigate();
  const update = useWidgetStore.use.updatePanelComponents();
  const select = useWidgetStore.use.updateSelectedComponent();
  const setCols = useWidgetStore.use.setCols();

  const [datastore, setDatastore] = useState<bo.Datastore>({});

  useEffect(() => {
    get(id).then((ds) => {
      if (ds) {
        setDatastore(ds);
        update(ds.schema?.components || []);
        select(null);

        setCols(ds.schema?.cols || 2);
      } else {
        navigate(-1);
      }
    });
  }, [did]);

  const back = () => {
    navigate(-1);
  };

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
              {datastore.name + '（表单设计）'}
            </h2>
            <p className='text-muted-foreground'>{datastore.desc}</p>
          </div>
          <div className='flex w-[200px] flex-row justify-end space-x-2'></div>
        </div>
        <SchemaEditor />
      </LayoutBody>
    </Layout>
  );
}
