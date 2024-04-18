import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWidgetStore } from '../../store/inputs';

interface TextInputProps {
  className?: string;
  id?: string;
}

const TextInput: FC<TextInputProps> = ({ className, id }) => {
  const { control } = useFormContext(); // retrieve all hook methods
  const ts = useWidgetStore((state) => state.ts);
  const find = useWidgetStore((state) => state.find);
  const [extra, setExtra] = useState<any>({
    name: 'text',
    title: '文本',
    placeholder: '请输入内容',
    desc: '',
  });

  useEffect(() => {
    const info = find(id ?? '');
    setExtra(info?.extra);
  }, [ts]);

  return (
    <FormField
      control={control}
      name={extra.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{extra.title}</FormLabel>
          <FormControl>
            <Input
              className={className}
              placeholder={extra.placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{extra.desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
