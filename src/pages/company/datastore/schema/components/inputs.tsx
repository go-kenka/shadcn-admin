import type { FC, ReactNode } from 'react';

interface InputsProps {
  items: ReactNode[];
}

const Inputs: FC<InputsProps> = ({ items }) => {
  return (
    <ul className='btn grid-stack-item flex flex-col items-center justify-start gap-2'>
      {items.map((it) => it)}
    </ul>
  );
};

export default Inputs;
