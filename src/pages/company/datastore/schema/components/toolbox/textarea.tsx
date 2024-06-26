import { IconTextWrap } from '@tabler/icons-react';
import { type FC } from 'react';
import useWidgetStore from '../store/inputs';

interface TextareaProps {}

const TextareaInput: FC<TextareaProps> = () => {
  const updateDropItme = useWidgetStore.use.updateDropItme();
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-100'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => {
        updateDropItme('textarea');
        e.dataTransfer.setData('text/plain', 'textarea');
      }}
    >
      <IconTextWrap className='h-4' />
      长文本(long text)
    </div>
  );
};

export default TextareaInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
