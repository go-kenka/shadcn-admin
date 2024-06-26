import { Button } from '@/components/custom/button';
import Empty from '@/components/custom/empty';
import ArrayInput from '@/components/inputs/array';
import BooleanInput from '@/components/inputs/boolean';
import ImageInput from '@/components/inputs/image';
import JsonInput from '@/components/inputs/json';
import NumberInput from '@/components/inputs/number';
import TextInput from '@/components/inputs/text';
import TextAreaInput from '@/components/inputs/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Component } from '@/data/scheam';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FormProvider, useForm } from 'react-hook-form';
import useWidgetStore from './store/inputs';
import './styles.css';

export const ReactGridLayout = WidthProvider(RGL);

export interface SchemaPreviewProps {
  className?: string;
  rowHeight?: number;
  compactType?: 'horizontal' | 'vertical' | null;
  cols?: number;
}

export const SchemaPreview: React.FC<SchemaPreviewProps> = ({
  className = 'layout1',
  rowHeight = 110,
  compactType = 'vertical',
  cols = 2,
}) => {
  const widgets = useWidgetStore.use.panelComponents();
  const form = useForm({ defaultValues: {} });
  const [components, setComponents] = useState(cloneDeep(widgets));

  useEffect(() => {
    setComponents(cloneDeep(widgets));
  }, [widgets]);

  const generateDOM = () => {
    if (components.length === 0)
      return (
        <Empty
          key={'empty'}
          data-grid={{ w: 12, h: 24, x: 0, y: 0, i: 'empty' }}
        />
      );

    return components.map((l: Component, i: number) => {
      l.isDraggable = false;
      const w = l.extra?.widget;
      if (w === 'json') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='h-full p-2'>
            {
              <JsonInput
                extra={l.extra ?? { name: 'json' }}
                className='border'
              />
            }
          </div>
        );
      }
      if (w === 'array') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='p-2'>
            {<ArrayInput extra={l.extra ?? { name: 'array' }} />}
          </div>
        );
      }
      if (w === 'number') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='p-2'>
            {<NumberInput extra={l.extra ?? { name: 'number' }} />}
          </div>
        );
      }
      if (w === 'boolean') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='p-2'>
            {<BooleanInput extra={l.extra ?? { name: 'boolean' }} />}
          </div>
        );
      }
      if (w === 'image') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='p-2'>
            {<ImageInput extra={l.extra ?? { name: 'image' }} />}
          </div>
        );
      }
      if (w === 'textarea') {
        return (
          <div key={l.i} data-grid={{ ...l }} className='p-2'>
            {<TextAreaInput extra={l.extra ?? { name: 'textarea' }} />}
          </div>
        );
      }

      return (
        <div key={i} data-grid={{ ...l }} className='p-2'>
          {<TextInput extra={l.extra ?? { name: 'text' }} />}
        </div>
      );
    });
  };

  function onSubmit(data: any) {
    toast({
      title: '你提交的数据会像下面这样',
      description: (
        <pre className='mt-2 w-[500px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>预览</Button>
      </DialogTrigger>
      <DialogContent className='h-[600px] max-w-[800px]'>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex h-full flex-col gap-4'
          >
            <DialogHeader>
              <DialogTitle>预览</DialogTitle>
            </DialogHeader>
            <div className='w-full flex-1'>
              <ReactGridLayout
                className={`${className} overflow-auto`}
                rowHeight={rowHeight}
                layout={components}
                cols={cols}
                margin={[1, 1]}
                measureBeforeMount={false}
                useCSSTransforms={true}
                verticalCompact={true}
                isDroppable={false}
                isResizable={false}
                compactType={compactType as any}
                preventCollision={false}
              >
                {generateDOM()}
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

export default SchemaPreview;
