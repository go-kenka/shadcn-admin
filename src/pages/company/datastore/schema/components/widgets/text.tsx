import { type FC } from 'react';

interface TextProps {}

const TextInput: FC<TextProps> = () => {
  return (
    <div className='sidebar inline-block h-full w-full p-0'>
      <div className='grid-stack-item' gs-w='2' gs-h='3'>
        <div className='grid-stack-item-content'>
          <div className='h-9 rounded bg-primary px-4 text-center leading-9 text-primary-foreground shadow hover:bg-primary/90'>
            文本
          </div>
        </div>
      </div>
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
