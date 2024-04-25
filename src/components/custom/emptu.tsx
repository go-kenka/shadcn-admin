import type { FC } from 'react';

interface EmptyProps {}

const Empty: FC<EmptyProps> = () => {
  return (
    <div className='flex !w-full flex-col items-center justify-center gap-2 rounded border border-dashed p-10'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-hourglass-empty'
        width='44'
        height='44'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='#00b341'
        fill='none'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z' />
        <path d='M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z' />
      </svg>
      <p className='w-full text-center text-sm'>什么都没有哦</p>
    </div>
  );
};

export default Empty;
