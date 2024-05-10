import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/custom/button.tsx';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Input } from '@/components/ui/input.tsx';

interface MappingCardProps {
  setCurrentTab: (tab: string) => void;
}

function MappingCard({ setCurrentTab }: MappingCardProps) {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'mappings', // unique name for your Field Array
  });
  return (
    <Card className={''}>
      <CardHeader>
        <CardTitle>配置映射关系</CardTitle>
      </CardHeader>
      <CardContent className='h-[600px] space-y-2 overflow-y-auto pb-2 pt-2'>
        {fields.map((field, index) => (
          <div key={field.id} className='flex items-center space-x-2'>
            <Input
              key={field.id} // important to include key with field's id
              placeholder='字段名称'
              disabled={true}
              className='w-[120px]'
              {...register(`mappings.${index}.title`)}
            />

            <FormField
              control={control}
              name={`mappings.${index}.type`}
              render={({ field }) => (
                <FormItem className=' space-y-3'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
          </div>
        ))}
      </CardContent>
      <CardFooter className={'justify-end space-x-2'}>
        <Button
          type={'button'}
          variant='secondary'
          onClick={() => setCurrentTab('base')}
        >
          上一步
        </Button>
        <Button type={'submit'}>提交</Button>
      </CardFooter>
    </Card>
  );
}

export default MappingCard;
