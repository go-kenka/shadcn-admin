import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface BooleanInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
  desc?: string;
}

interface BooleanInputProps {
  className?: string;
  extra: BooleanInputExtraProps;
}

const BooleanInput: FC<BooleanInputProps> = ({ className, extra }) => {
  const { control, getValues } = useFormContext(); // retrieve all hook methods
  const [current, setCurrent] = useState<BooleanInputExtraProps>(extra);
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
          <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4'>
            <FormControl>
              <Checkbox
                className={className}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              <FormLabel>{current.title}</FormLabel>
              <FormDescription>{current.desc}</FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default BooleanInput;
