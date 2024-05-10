import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/custom/button.tsx';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';

interface BaseCardProps {
  setCurrentTab: (tab: string) => void;
}

function BaseCard({ setCurrentTab }: BaseCardProps) {
  const { register, control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>设置基本信息</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='name'>映射名称</Label>
          <Input {...register('name')} placeholder='请输入名称' />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='desc'>详细描述</Label>
          <Textarea {...register('desc')} placeholder={'请输入描述'} />
        </div>
        <div className='space-y-1'>
          <FormField
            control={control}
            name='is_default'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>作为当前仓库的默认对外映射关系</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className={'justify-end space-x-2'}>
        <Button type={'button'} onClick={() => setCurrentTab('mapping')}>
          下一步
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BaseCard;
