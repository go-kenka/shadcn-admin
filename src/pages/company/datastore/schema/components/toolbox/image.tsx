import { IconPhoto } from '@tabler/icons-react';
import { type FC } from 'react';

interface ImageProps {}

const ImageInput: FC<ImageProps> = () => {
  return (
    <div
      className='flex h-10 w-full flex-row items-center justify-start gap-1 rounded border border-dashed p-2 hover:bg-cyan-200'
      draggable={true}
      unselectable='on'
      onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
    >
      <IconPhoto className='h-4' />
      图片(url)
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
