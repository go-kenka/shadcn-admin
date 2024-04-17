import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ColumnsIcon, LayoutIcon } from '@radix-ui/react-icons';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
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
  rowHeight = 100,
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
    return _.map(layouts.lg, (l, i) => {
      return (
        <Card key={i} data-grid={l} className='rounded-sm'>
          <CardHeader className='p-0 pl-2 pr-2'>{i}</CardHeader>
          <CardContent className='p-0 pl-2 pr-2'>{i}</CardContent>
        </Card>
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
    onLayoutChange(layout, layouts);
  };

  const onDrop = (layout: Layout[], _item: Layout, _event: Event) => {
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
        useCSSTransforms={mounted}
        compactType={compactType as any}
        preventCollision={true}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default DragFromOutsideLayout;
