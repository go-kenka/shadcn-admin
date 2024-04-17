import { IconSquareCheck } from '@tabler/icons-react';
import { type FC } from 'react';

interface BooleanProps {}

const BooleanInput: FC<BooleanProps> = () => {
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-100'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
    >
      <IconSquareCheck className='h-4' />
      布尔(true/false)
    </div>
  );
};

export default BooleanInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
