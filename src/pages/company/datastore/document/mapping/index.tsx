import { useEffect } from 'react';

import { DataTable } from './components/data-table.tsx';
import { columns } from './components/columns.tsx';
import { useMapping } from './store/mapping.ts';
import { useParams } from 'react-router-dom';

function Index() {
  const { did } = useParams();
  const id = Number(did);
  const { search, list } = useMapping();

  useEffect(() => {
    search(id);
  }, [id]);

  return <DataTable data={list} columns={columns} />;
}

export default Index;
