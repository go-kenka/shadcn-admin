import { Button } from '@/components/custom/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Component } from '@/data/scheam';
import { IconEdit } from '@tabler/icons-react';
import { cloneDeep, forIn } from 'lodash';
import { useEffect, useState, type FC } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '../store/row';
import { generateDOM } from './inputs';
import './styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface UpdateRowProps {
  id: number;
}

const UpdateRow: FC<UpdateRowProps> = ({ id }) => {
  const { update, datastore, rows } = useDocumentStore();
  const { did } = useParams();
  const form = useForm<Record<string, any>>({ defaultValues: {} });
  const [components, setComponents] = useState<Component[]>([]);
  const [cols, setCols] = useState<number>(2);

  useEffect(() => {
    if (did) {
      // 禁止拖拽
      const cms = cloneDeep(datastore?.schema?.components ?? []);
      cms.forEach((l: Component) => {
        l.isDraggable = false;
        l.isResizable = false;
      });

      setComponents(cms);
      setCols(datastore?.schema?.cols ?? 2);
    }
  }, [did]);

  useEffect(() => {
    if (id > 0) {
      const row = rows.find((r) => r.id?.toString() === id.toString());
      if (row) {
        forIn(row.data, (val, key) => {
          form.setValue(key, val);
        });
      }
    }
  }, [id]);

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    console.log('onSubmit', data);
    await update(Number(did), id, data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'outline'} className='gap-2'>
          <IconEdit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[600px] max-w-[800px]'>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex h-full flex-col gap-4'
          >
            <DialogHeader>
              <DialogTitle>修改数据</DialogTitle>
            </DialogHeader>
            <div className='w-full flex-1'>
              <ReactGridLayout
                className={`layout2 overflow-auto`}
                rowHeight={110}
                layout={components}
                cols={cols}
                margin={[1, 1]}
                measureBeforeMount={false}
                useCSSTransforms={true}
                verticalCompact={true}
                isDroppable={false}
                isResizable={false}
                compactType={'vertical'}
                preventCollision={false}
              >
                {generateDOM(components)}
              </ReactGridLayout>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='reset' variant={'secondary'}>
                  取消
                </Button>
              </DialogClose>
              <Button type='submit' variant={'default'}>
                提交
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRow;
