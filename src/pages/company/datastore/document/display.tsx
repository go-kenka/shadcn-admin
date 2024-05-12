import Loader from '@/components/loader.tsx';
import { type FC } from 'react';
import { getColumns } from './components/columns.tsx';
import { DataTable } from './components/data-table.tsx';
import SingleSpreadsheet from './sheet';
import { useDocumentStore } from './store/row.ts';

interface DisplayProps {
  mode: number;
}

const Display: FC<DisplayProps> = ({ mode = 0 }) => {
  const { rows, fields, loading } = useDocumentStore();
  if (loading) {
    return <Loader />;
  }

  if (mode === 1) {
    return <DataTable data={rows} columns={getColumns(fields)} />;
  }

  return <SingleSpreadsheet></SingleSpreadsheet>;
};

export default Display;
