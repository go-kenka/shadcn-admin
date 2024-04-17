import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FC } from 'react';

interface TextInputProps {
  className?: string;
  name?: string;
}

const TextInput: FC<TextInputProps> = ({ className, name }) => {
  return (
    <>
      <Label htmlFor={name}>{name}</Label>
      <Input className={className} name={name} />
    </>
  );
};

export default TextInput;
