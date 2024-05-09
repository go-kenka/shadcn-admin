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
import { IconPlus } from '@tabler/icons-react';
import { cloneDeep } from 'lodash';
import { useEffect, useState, type FC } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '../store/row';
import { generateDOM } from './inputs';
import './styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface CreateRowProps {}

const CreateRow: FC<CreateRowProps> = ({}) => {
  const { add, datastore } = useDocumentStore();
  const { did } = useParams();
  const form = useForm({ defaultValues: {} });
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

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    console.log('onSubmit', data);
    await add(Number(did), data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <IconPlus className='w-5' /> 添加
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[600px] max-w-[800px]'>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex h-full flex-col gap-4'
          >
            <DialogHeader>
              <DialogTitle>添加数据</DialogTitle>
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

export default CreateRow;
