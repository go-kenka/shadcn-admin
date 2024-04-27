import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextAreaInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
}

interface TextAreaInputProps {
  className?: string;
  extra: TextAreaInputExtraProps;
}

const TextAreaInput: FC<TextAreaInputProps> = ({ className, extra }) => {
  const { control, getValues } = useFormContext(); // retrieve all hook methods
  const [current, setCurrent] = useState<TextAreaInputExtraProps>(extra);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (current.name !== extra.name) {
      const ov = getValues(current.name);
      setValue(ov);
      control.unregister(current.name);
      control.register(extra.name, { value: ov });
      setCurrent(extra);
      return;
    }

    setCurrent(extra);
  }, [JSON.stringify(extra)]);

  return (
    <FormField
      control={control}
      name={current.name}
      render={({ field }) => {
        if (!field.value) {
          field.value = value ?? '';
        }
        return (
          <FormItem className='flex h-full flex-col'>
            <FormLabel>{current.title}</FormLabel>
            <FormControl className='flex-1'>
              <Textarea
                className={`${className} box-border h-full resize-none`}
                placeholder={current.placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextAreaInput;
