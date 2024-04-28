import { type FC } from 'react';
import Loader from '@/components/loader.tsx';
import { useDocumentStore } from '@/pages/company/datastore/document/store/row.ts';
import { getColumns } from '@/pages/company/datastore/document/components/columns.tsx';
import { DataTable } from '@/pages/company/datastore/document/components/data-table.tsx';
import SingleSpreadsheet from '@/pages/company/datastore/document/sheet';

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
