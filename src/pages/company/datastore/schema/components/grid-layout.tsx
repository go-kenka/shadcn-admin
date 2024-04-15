import { Button } from '@/components/custom/button';
import { GridStack } from 'gridstack';
import { createRef, useEffect, useRef, type FC } from 'react';
import './styles.css';

interface GridLayoutProps {
  items: any[];
  addItem: () => void;
}

// @ts-ignore
const Item = ({ id }) => <div>{id}</div>;

function myClone(event: any) {
  const el: HTMLElement = event.target.cloneNode(true);
  el.setAttribute('gs-id', 'foo'); // TEST why clone element is not used directly on drop #2231
  el.dataset.ok = 'true';
  return el;
}

const GridLayout: FC<GridLayoutProps> = ({ items, addItem }) => {
  const refs = useRef<any>({});
  const gridRef = useRef<GridStack>();

  const options = {
    // main grid options
    cellHeight: 50,
    margin: 5,
    minRow: 50,
    float: true,
    // sizeToContent: true, // default to make them all fit
    acceptWidgets: true,
    removable: 'body',
    columnOpts: {
      breakpointForWindow: true, // test window vs grid size
      breakpoints: [
        { w: 700, c: 1 },
        { w: 850, c: 3 },
        { w: 950, c: 6 },
        { w: 1100, c: 8 },
      ],
    },
  };

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    gridRef.current = gridRef.current || GridStack.init(options);
    const grid = gridRef.current;
    GridStack.setupDragIn('.btn .grid-stack-item', {
      appendTo: 'body',
      helper: myClone,
    });
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    grid.batchUpdate(false);
  }, [items]);

  const exportData = () => {
    const data = gridRef.current?.save(true);
    console.log(data);
  };

  return (
    <div className='h-full overflow-auto'>
      <Button onClick={exportData}>Add new widget</Button>
      <div className={`grid-stack controlled`}>
        {items.map((item, i) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className={'grid-stack-item border bg-green-100 p-2'}
            >
              <div className='grid-stack-item-content'>
                <Item {...item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridLayout;
