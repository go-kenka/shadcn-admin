import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cross1Icon } from '@radix-ui/react-icons';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface ArrayInputExtraProps {
  name: string;
  title?: string;
  placeholder?: string;
  desc?: string;
}

interface ArrayInputProps {
  className?: string;
  extra: ArrayInputExtraProps;
}

const ArrayInput: FC<ArrayInputProps> = ({ className, extra }) => {
  const { control, getValues, register } = useFormContext(); // retrieve all hook methods
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: extra.name, // unique name for your Field Array
  });

  const [current, setCurrent] = useState<ArrayInputExtraProps>(extra);
  // const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (current.name !== extra.name) {
      const ov = getValues(current.name);
      // setValue(ov);
      control.unregister(current.name);
      control.register(extra.name, { value: ov });
      setCurrent(extra);
      return;
    }

    setCurrent(extra);
  }, [JSON.stringify(extra)]);

  return (
    <div className='h-full overflow-auto'>
      <div className='sticky top-0 flex items-center justify-between p-2'>
        <Label htmlFor={extra.name}>{extra.title}</Label>
        <IconPlus onClick={() => append('')} />
      </div>
      {fields.length === 0 && (
        <div className='flex flex-row items-center justify-between gap-2 pb-2 pl-1 pr-1 pt-2'>
          <span className='text-sm text-secondary-foreground'>
            点击+添加输入内容
          </span>
        </div>
      )}
      {fields.map((f, index) => (
        <div className='flex flex-row items-center justify-between gap-2 pb-2 pl-1 pr-1 pt-2'>
          <Input
            className={className}
            key={f.id} // important to include key with field's id
            placeholder={extra.placeholder}
            {...register(`${extra.name}.${index}`)}
          />

          <Cross1Icon className='text-red-500' onClick={() => remove(index)} />
        </div>
      ))}
    </div>
  );
};

export default ArrayInput;
