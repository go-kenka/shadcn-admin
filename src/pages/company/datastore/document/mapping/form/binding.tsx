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
import { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GetBindingData } from '@/wailsjs/go/service/Datastore';
import { useMapping } from '../store/mapping.ts';

interface FormProps {
  id: number;
}

interface SubmitData {
  event: string; // 事件类型
  data: any;
}

const BindingForm: FC<FormProps> = ({ id }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const form = useForm({});
  const [data, setData] = useState<bo.Adapter[]>([]);
  const { binding } = useMapping();

  useEffect(() => {
    SearchAdapters({ id: 0, name: '' }).then((res) => {
      if (!res.error) {
        setData(res.list || []);
      }
    });
  }, []);

  const onSubmit = (data: any) => {
    binding(Number(data.aid), id, data.config);
  };

  useEffect(() => {
    window.addEventListener('message', onMessage, false);
  }, []);

  const onMessage = (event: MessageEvent<SubmitData>) => {
    if (event) {
      // 获取数据
      const message = event.data;
      if (message.event === 'submit') {
        // 保存数据
        form.setValue('config', message.data);
      }
    }
  };

  const onAdapterChange = async (v: string) => {
    if (ref) {
      const iframe = ref.current;
      if (iframe) {
        // 获取以前保存的数据
        const data = await GetBindingData(Number(v), id);
        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(data.data);
        // 发送数据到插件
        iframe.contentWindow?.postMessage(
          { event: 'init', data: data.data },
          '*'
        );
      }
    }
  };

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
              <CardContent className='flex h-full flex-col'>
                <FormField
                  control={form.control}
                  name={'aid'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>插件</FormLabel>
                      <Select
                        onValueChange={(v) => {
                          field.onChange(v);
                          onAdapterChange(v);
                        }}
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
                <div className='mt-4 flex flex-1 flex-col'>
                  <Label>参数配置</Label>
                  <div className='mt-2 flex-1 rounded border'>
                    <iframe
                      ref={ref}
                      src='http://localhost:51234/plugins/MyAdapter/1.0/'
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
