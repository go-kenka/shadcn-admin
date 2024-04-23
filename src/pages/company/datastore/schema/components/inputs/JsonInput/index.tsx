import { useTheme } from '@/components/theme-provider';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Editor from '@monaco-editor/react';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface JsonInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
  desc?: string;
}

interface JsonInputProps {
  className?: string;
  extra: JsonInputExtraProps;
}

const JsonInput: FC<JsonInputProps> = ({ className, extra }) => {
  const { control, getValues } = useFormContext(); // retrieve all hook methods
  const [current, setCurrent] = useState<JsonInputExtraProps>(extra);
  const [value, setValue] = useState<string>('');
  const { theme } = useTheme();

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
              <Editor
                className={`${className} min-h-[100px] rounded`}
                defaultLanguage='json'
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                defaultValue={current.placeholder}
                onChange={field.onChange}
                value={field.value}
                options={{
                  minimap: { enabled: false },
                  readOnly: field.disabled,
                }}
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

export default JsonInput;
