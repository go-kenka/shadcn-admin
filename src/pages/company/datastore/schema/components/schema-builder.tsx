import { Button } from '@/components/custom/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ColumnsIcon, LayoutIcon } from '@radix-ui/react-icons';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { FormProvider, useForm } from 'react-hook-form';
import ArrayInput from './inputs/ArrayInput';
import BooleanInput from './inputs/BooleanInput';
import ImageInput from './inputs/ImageInput';
import JsonInput from './inputs/JsonInput';
import NumberInput from './inputs/NumberInput';
import TextAreaInput from './inputs/TextAreaInput';
import TextInput from './inputs/TextInput';
import useWidgetStore, { Component } from './store/inputs';
import './styles.css';

export const ReactGridLayout = WidthProvider(RGL);

export interface SchemaBuilderProps {
  className?: string;
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  compactType?: 'horizontal' | 'vertical' | null;
  cols?: number;
}

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({
  className = 'layout',
  rowHeight = 110,
  onLayoutChange = () => {},
  compactType = 'vertical',
  cols = 2,
}) => {
  const [col, setCol] = useState<number>(cols);
  const widgets = useWidgetStore.use.panelComponents();
  const droppingItem = useWidgetStore.use.droppingItem();
  const update = useWidgetStore.use.updatePanelComponents();
  const select = useWidgetStore.use.updateSelectedComponent();
  const form = useForm({ defaultValues: {} });

  const generateDOM = () => {
    return widgets.map((l: Component) => {
      const w = l.extra?.widget;
      if (w === 'json') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='h-full rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {
              <JsonInput
                extra={l.extra ?? { name: 'text' }}
                className='border'
              />
            }
          </Card>
        );
      }
      if (w === 'array') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {<ArrayInput extra={l.extra ?? { name: 'array' }} />}
          </Card>
        );
      }
      if (w === 'number') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {<NumberInput extra={l.extra ?? { name: 'number' }} />}
          </Card>
        );
      }
      if (w === 'boolean') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {<BooleanInput extra={l.extra ?? { name: 'boolean' }} />}
          </Card>
        );
      }
      if (w === 'image') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {<ImageInput extra={l.extra ?? { name: 'image' }} />}
          </Card>
        );
      }
      if (w === 'textarea') {
        return (
          <Card
            key={l.i}
            data-grid={{ ...l }}
            className='rounded-sm border p-2'
            onClick={() => {
              select(l);
            }}
          >
            {<TextAreaInput extra={l.extra ?? { name: 'textarea' }} />}
          </Card>
        );
      }

      return (
        <Card
          key={l.i}
          data-grid={{ ...l }}
          className='rounded-sm border p-2'
          onClick={() => {
            select(l);
          }}
        >
          {<TextInput extra={l.extra ?? { name: 'json' }} />}
        </Card>
      );
    });
  };

  const onDrop = (
    _layouts: Component[],
    item: Component,
    _event: DragEvent
  ) => {
    item['i'] = nanoid(5);
    const extra: any = {};
    const data = _event.dataTransfer?.getData('text/plain');
    switch (data) {
      case 'text':
        extra['name'] = 'text_' + item.i;
        extra['title'] = '文本输入';
        extra['widget'] = 'text';
        extra['placeholder'] = '请输入文本';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'number':
        extra['name'] = 'number_' + item.i;
        extra['title'] = '数字输入';
        extra['widget'] = 'number';
        extra['placeholder'] = '请输入数字';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'boolean':
        extra['name'] = 'boolean_' + item.i;
        extra['title'] = '布尔类型';
        extra['widget'] = 'boolean';
        extra['placeholder'] = '请输入数字';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'textarea':
        extra['name'] = 'textarea_' + item.i;
        extra['title'] = '长文本输入';
        extra['widget'] = 'textarea';
        extra['placeholder'] = '请输入文本';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'json':
        extra['name'] = 'json_' + item.i;
        extra['title'] = 'json输入';
        extra['widget'] = 'json';
        extra['placeholder'] = '{}';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'array':
        extra['name'] = 'array_' + item.i;
        extra['title'] = '数组输入';
        extra['widget'] = 'array';
        extra['placeholder'] = '请输入内容';
        extra['desc'] = '这是一个提示文字';
        break;
      case 'image':
        extra['name'] = 'image_' + item.i;
        extra['title'] = '图片上传';
        extra['widget'] = 'image';
        extra['placeholder'] = '请上传图片';
        extra['desc'] = '这是一个提示文字';
        break;

      default:
        break;
    }
    // 更新数据
    item['extra'] = extra;

    widgets.push(item);
    update(widgets);
    select(item);
  };

  const onDropStop = (
    _layout: Component[],
    _oldItem: Component,
    newItem: Component
  ) => {
    const changed = widgets.find((i) => i.i === newItem.i);
    if (changed) {
      changed.x = newItem.x;
      changed.y = newItem.y;
      changed.w = newItem.w;
      changed.h = newItem.h;
      select(changed);
    }
  };

  const onResize = (
    _layout: Component[],
    _oldItem: Component,
    newItem: Component
  ) => {
    const changed = widgets.find((i) => i.i === newItem.i);
    if (changed) {
      changed.x = newItem.x;
      changed.y = newItem.y;
      changed.w = newItem.w;
      changed.h = newItem.h;
      select(changed);
    }
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
    <div className='h-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='h-full'>
          <div className='flex flex-row items-center justify-between bg-background'>
            <div className='flex flex-1 gap-1'>
              <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
                <ColumnsIcon />
                <Input
                  type='number'
                  className='w-24'
                  step={1}
                  min={1}
                  max={12}
                  value={col}
                  onChange={(e) => setCol(Number(e.target.value))}
                />
              </div>
              <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
                <LayoutIcon />
                {compactType}
              </div>
            </div>
            <Button type='submit' variant={'secondary'}>
              结果
            </Button>
          </div>

          <ReactGridLayout
            className={`${className} overflow-auto rounded border`}
            rowHeight={rowHeight}
            layout={widgets}
            cols={col}
            margin={[1, 1]}
            onDrop={onDrop}
            onResize={onResize}
            onDrag={onDropStop}
            droppingItem={droppingItem}
            onLayoutChange={onLayoutChange}
            measureBeforeMount={false}
            useCSSTransforms={true}
            verticalCompact={true}
            allowOverlap={false}
            autoSize={true}
            compactType={compactType as any}
            preventCollision={false}
            isDroppable={true}
          >
            {generateDOM()}
          </ReactGridLayout>
        </form>
      </FormProvider>
    </div>
  );
};

export default SchemaBuilder;
