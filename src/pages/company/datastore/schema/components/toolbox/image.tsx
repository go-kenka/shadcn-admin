import { IconPhoto } from '@tabler/icons-react';
import { type FC } from 'react';
import useWidgetStore from '../store/inputs';

interface ImageProps {}

const ImageInput: FC<ImageProps> = () => {
  const updateDropItme = useWidgetStore.use.updateDropItme();
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-200'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => {
        updateDropItme('image');
        e.dataTransfer.setData('text/plain', 'image');
      }}
    >
      <IconPhoto className='h-4' />
      图片(image url)
    </div>
  );
};

export default ImageInput;

// .sidebar.inline {
//   width: fit-content;
//   height: fit-content;
//   display: inline-block;
//   padding: 0;
// }
