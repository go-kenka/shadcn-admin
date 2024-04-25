import { IconLayoutList } from '@tabler/icons-react';
import { type FC } from 'react';
import useWidgetStore from '../store/inputs';

interface ArrayProps {}

const ArrayInput: FC<ArrayProps> = () => {
  const updateDropItme = useWidgetStore.use.updateDropItme();
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-100'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => {
        updateDropItme('array');
        e.dataTransfer.setData('text/plain', 'array');
      }}
    >
      <IconLayoutList className='h-4' />
      数组(array)
    </div>
  );
};

export default ArrayInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
