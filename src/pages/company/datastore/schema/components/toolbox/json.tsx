import { IconJson } from '@tabler/icons-react';
import { type FC } from 'react';
import useWidgetStore from '../store/inputs';

interface JsonProps {}

const JsonInput: FC<JsonProps> = () => {
  const updateDropItme = useWidgetStore.use.updateDropItme();
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-100'
      draggable={true}
      data-grid={{ w: 1, h: 2 }}
      unselectable='on'
      onDragStart={(e) => {
        updateDropItme('json');
        e.dataTransfer.setData('text/plain', 'json');
      }}
    >
      <IconJson className='h-4' data-grid={{ w: 1, h: 2 }} />
      JSON(object)
    </div>
  );
};

export default JsonInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
