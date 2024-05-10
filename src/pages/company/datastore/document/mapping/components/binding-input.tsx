import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bo } from '@/wailsjs/go/models';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../../../store/datastore';
import CodeEditor from './code-editor';

interface BindingInputProps {
  name: string;
  type: string;
}

const BindingInput: FC<BindingInputProps> = ({ type, name }) => {
  const { control } = useFormContext();
  const { did } = useParams();
  const { get } = useDataStore();
  const [fields, setFields] = useState<bo.Field[]>();

  useEffect(() => {
    if (did) {
      get(Number(did)).then((d) => {
        if (d?.fields) {
          setFields(d.fields);
        }
      });
    }
  }, [did]);

  if (type === 'binding') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className='w-[280px]'>
                  <SelectValue placeholder='请选择需要绑定的字段' />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='w-[280px]'>
                {fields?.map((f, i) => (
                  <SelectItem key={i} value={f.key}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    );
  }

  if (type === 'func') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CodeEditor value={field.value} onChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} placeholder='请输入内容' className='w-[280px]' />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

interface BindingItemProps {
  index: number;
}

const BindingItem: FC<BindingItemProps> = ({ index }) => {
  const { control, register, setValue, getValues } = useFormContext();

  const [fType, setFType] = useState<string>(
    getValues(`mappings.${index}.type`)
  );

  return (
    <div className='flex items-center justify-start space-x-2'>
      <Input
        placeholder='字段名称'
        readOnly={true}
        className='w-[180px]'
        {...register(`mappings.${index}.title`)}
      />

      <FormField
        control={control}
        name={`mappings.${index}.type`}
        render={({ field }) => (
          <FormItem className=' space-y-3 rounded border p-1.5'>
            <FormControl>
              <RadioGroup
                onValueChange={(v) => {
                  setFType(v);
                  setValue(`mappings.${index}.from_key`, '');
                  field.onChange(v);
                }}
                value={field.value}
                className='row flex space-y-1'
              >
                <FormItem className='flex items-center space-x-3 space-y-0'>
                  <FormControl>
                    <RadioGroupItem value='binding' />
                  </FormControl>
                  <FormLabel className='font-normal'>绑定字段</FormLabel>
                </FormItem>
                <FormItem className='flex items-center space-x-3 space-y-0'>
                  <FormControl>
                    <RadioGroupItem value='fixed' />
                  </FormControl>
                  <FormLabel className='font-normal'>固定值</FormLabel>
                </FormItem>
                <FormItem className='flex items-center space-x-3 space-y-0'>
                  <FormControl>
                    <RadioGroupItem value='func' />
                  </FormControl>
                  <FormLabel className='font-normal'>函数</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <BindingInput name={`mappings.${index}.from_key`} type={fType} />
    </div>
  );
};

export default BindingItem;
