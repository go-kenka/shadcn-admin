import { IconCursorText } from '@tabler/icons-react';
import { type FC } from 'react';
import useWidgetStore from '../store/inputs';

interface TextProps {}

const TextInput: FC<TextProps> = () => {
  const updateDropItme = useWidgetStore.use.updateDropItme();
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-200'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => {
        updateDropItme('default');
        e.dataTransfer.setData('text/plain', 'text');
      }}
    >
      <IconCursorText className='h-4' />
      文本(20)
    </div>
  );
};

export default TextInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
