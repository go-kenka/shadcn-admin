import { Button } from '@/components/custom/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
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
import { SheetFooter } from '@/components/ui/sheet.tsx';
import { bo } from '@/wailsjs/go/models';
import { SearchAdapters } from '@/wailsjs/go/service/Adapter';
import { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBindingAdapter } from '../store/adapter.ts';

interface FormProps {
  mid: number;
  aid?: number;
}

interface SubmitData {
  event: string; // 事件类型
  data: any;
}

const BindingForm: FC<FormProps> = ({ mid, aid }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const form = useForm({});
  const [data, setData] = useState<bo.Adapter[]>([]);
  const [adapter, setAdapter] = useState<bo.Adapter>();
  const { binding, getBinding } = useBindingAdapter();

  useEffect(() => {
    SearchAdapters({ id: 0, name: '' }).then((res) => {
      if (!res.error) {
        setData(res.list || []);
      }
    });
  }, []);

  useEffect(() => {
    if (aid) {
      setAdapter(data.find((a) => a.id === aid));
    }
  }, [aid, form.getValues('aid')]);

  useEffect(() => {
    form.setValue('aid', adapter?.id || '');
  }, [adapter]);

  const onSubmit = (data: any) => {
    binding(Number(data.aid), mid, data.config);
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
    if (v) {
      const aid = Number(v);
      setAdapter(data.find((a) => a.id === aid));
      if (ref) {
        const iframe = ref.current;
        if (iframe) {
          // 获取以前保存的数据
          const data = await getBinding(aid, mid);
          // 发送数据到插件
          iframe.contentWindow?.postMessage({ event: 'init', data: data }, '*');
        }
      }
    }
  };

  return (
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
                    disabled={aid !== undefined}
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
                  src={`http://localhost:51234/plugins/${adapter?.manifest?.id}/${adapter?.manifest?.version}/`}
                  className='!h-full w-full'
                ></iframe>
              </div>
            </div>
          </CardContent>
        </Card>
        <SheetFooter className='mt-2'>
          <Button type='submit'>提交</Button>
        </SheetFooter>
      </form>
    </FormProvider>
  );
};

export default BindingForm;
