import { Button } from '@/components/custom/button';
import { toast } from '@/components/ui/use-toast';
import { ColumnsIcon, LayoutIcon } from '@radix-ui/react-icons';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from './inputs/TextInput';
import useWidgetStore, { Component } from './store/inputs';
import './styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DragFromOutsideLayoutProps {
  className?: string;
  rowHeight?: number;
  onLayoutChange?: (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => void;
  compactType?: 'horizontal' | 'vertical' | null;
  cols?: { [key: string]: number };
}

const DragFromOutsideLayout: React.FC<DragFromOutsideLayoutProps> = ({
  className = 'layout',
  rowHeight = 110,
  onLayoutChange = () => {},
  compactType = 'vertical',
  cols = { lg: 6, md: 4, sm: 2, xs: 2, xxs: 1 },
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  const [mounted, setMounted] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({
    lg: [],
  });
  const widgets = useWidgetStore.use.panelComponents();
  const update = useWidgetStore.use.updatePanelComponents();
  const select = useWidgetStore.use.updateSelectedComponent();
  const form = useForm({ defaultValues: {} });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLayouts({ lg: widgets });
  }, [widgets]);

  const generateDOM = () => {
    return widgets.map((l: Component, i: number) => {
      return (
        <div
          key={l.i}
          data-grid={{ ...l }}
          className='rounded-sm border p-2'
          onClick={() => {
            select(l);
          }}
        >
          {<TextInput extra={l.extra} />}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  const handleLayoutChange = (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => {
    console.log(layouts);
    onLayoutChange(layout, layouts);
  };

  const onDrop = (layouts: Component[], _item: any, _event: DragEvent) => {
    _item['i'] = nanoid(5);
    const extra: any = {};
    const data = _event.dataTransfer?.getData('text/plain');
    switch (data) {
      case 'text':
        extra['name'] = 'text_' + _item.i;
        extra['title'] = '文本输入';
        extra['widget'] = 'text';
        extra['placeholder'] = '请输入文本';
        extra['desc'] = '这是一个提示文字';
        break;

      default:
        break;
    }
    // 更新数据
    _item['extra'] = extra;

    update(layouts);
    select(_item);
    setLayouts({ lg: layouts });
  };

  const onDropStop = (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
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
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className='h-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='h-full'>
          <div className='mb-2 flex flex-row justify-between'>
            <div className='flex flex-1 gap-1'>
              <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
                <ColumnsIcon />
                {cols[currentBreakpoint]}
              </div>
              <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
                <LayoutIcon />
                {compactType}
              </div>
            </div>
            <Button type='submit'>预览</Button>
          </div>

          <ResponsiveReactGridLayout
            className={`${className} rounded border`}
            rowHeight={rowHeight}
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={cols}
            onBreakpointChange={onBreakpointChange}
            onLayoutChange={handleLayoutChange}
            onDrop={onDrop}
            onDragStop={onDropStop}
            measureBeforeMount={false}
            useCSSTransforms={true}
            verticalCompact={true}
            compactType={compactType as any}
            preventCollision={false}
            isDroppable={true}
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </form>
      </FormProvider>
    </div>
  );
};

export default DragFromOutsideLayout;
