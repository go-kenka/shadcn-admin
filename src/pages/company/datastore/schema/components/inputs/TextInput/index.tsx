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

interface TextInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
  desc?: string;
}

interface TextInputProps {
  className?: string;
  extra: TextInputExtraProps;
}

const TextInput: FC<TextInputProps> = ({ className, extra }) => {
  const { control, getValues } = useFormContext(); // retrieve all hook methods
  const [current, setCurrent] = useState<TextInputExtraProps>(extra);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (current.name !== extra.name) {
      const ov = getValues(current.name);
      setValue(ov);
      control.unregister(current.name);
      control.register(extra.name, { value: ov });
      setCurrent(extra);
    }
  }, [extra.name]);

  return (
    <FormField
      control={control}
      name={current.name}
      render={({ field }) => {
        if (!field.value) {
          field.value = value ?? '';
        }
        return (
          <FormItem>
            <FormLabel>{current.title}</FormLabel>
            <FormControl>
              <Input
                className={className}
                placeholder={current.placeholder}
                {...field}
              />
            </FormControl>
            <FormDescription>{current.desc}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextInput;
