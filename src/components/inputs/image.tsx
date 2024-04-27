import { FileUpload } from '@/components/custom/file-upload';
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

interface ImageInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
  desc?: string;
}

interface ImageInputProps {
  className?: string;
  extra: ImageInputExtraProps;
}

const ImageInput: FC<ImageInputProps> = ({ extra }) => {
  const { control, getValues } = useFormContext(); // retrieve all hook methods
  const [current, setCurrent] = useState<ImageInputExtraProps>(extra);
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
          field.value = value ?? [];
        }
        return (
          <FormItem>
            <FormLabel>{current.title}</FormLabel>
            <FormControl>
              <FileUpload {...field} />
            </FormControl>
            <FormDescription>{current.desc}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ImageInput;
