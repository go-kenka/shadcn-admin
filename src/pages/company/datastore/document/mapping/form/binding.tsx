import { Button } from '@/components/custom/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bo } from '@/wailsjs/go/models';
import { SearchAdapters } from '@/wailsjs/go/service/Adapter';
import { IconCirclesRelation } from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormProps {
  id: number;
}

const BindingForm: FC<FormProps> = ({}) => {
  const form = useForm();
  const [data, setData] = useState<bo.Adapter[]>([]);

  useEffect(() => {
    SearchAdapters({ id: 0, name: '' }).then((res) => {
      if (!res.error) {
        setData(res.list || []);
      }
    });
  }, []);

  const onSubmit = (data: any) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>
          <IconCirclesRelation className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle>插件配置</DialogTitle>
          <DialogDescription>请选择插件并配置插件参数</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <Card className='h-[500px] w-full p-4'>
              <CardContent className='flex flex-col h-full'>
                <FormField
                  control={form.control}
                  name={'aid'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>插件</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='请选择插件' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='w-full'>
                          {data?.map((a, i) => (
                            <SelectItem key={i} value={`${a.id}`}>
                              {a.manifest?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className='mt-4 flex-1 flex flex-col'>
                  <Label>参数配置</Label>
                  <div className='mt-2 rounded border flex-1'>
                    <iframe
                      src='http://localhost:51234/plugins/test01/v1.0.0/index.html'
                      className='!h-full w-full'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
            <DialogFooter className='mt-2'>
              <Button type='submit'>提交</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default BindingForm;
