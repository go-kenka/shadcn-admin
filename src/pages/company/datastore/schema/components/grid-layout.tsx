import { ColumnsIcon, LayoutIcon } from '@radix-ui/react-icons';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import TextInput from './inputs/TextInput';
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
  rowHeight = 75,
  onLayoutChange = () => {},
  compactType = 'vertical',
  cols = { lg: 6, md: 4, sm: 2, xs: 2, xxs: 1 },
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  const [mounted, setMounted] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({
    lg: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDOM = () => {
    return layouts.lg.map((l: any, i: number) => {
      const extra = JSON.parse(l.i);
      console.log(l);
      return (
        <div key={l.i} data-grid={{ ...l }} className='rounded-sm border p-2'>
          {<TextInput name={extra['ititle']} />}
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

  const onDrop = (layout: Layout[], _item: any, _event: DragEvent) => {
    const iType = _event.dataTransfer?.getData('text/plain');
    switch (iType) {
      case 'text':
        _item['itype'] = 'text';
        _item['ititle'] = '文本输入';
        _item['id'] = nanoid();
        break;

      default:
        break;
    }
    _item.i = JSON.stringify(_item);
    console.log(layout);
    setLayouts({ lg: layout });
  };

  return (
    <div className='h-full'>
      <div className='mb-2 flex flex-row justify-between'>
        <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
          <ColumnsIcon />
          {cols[currentBreakpoint]}
        </div>
        <div className='flex flex-row items-center justify-start gap-2 rounded border p-1'>
          <LayoutIcon />
          {compactType}
        </div>
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
        measureBeforeMount={false}
        useCSSTransforms={true}
        verticalCompact={true}
        compactType={compactType as any}
        preventCollision={false}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default DragFromOutsideLayout;
