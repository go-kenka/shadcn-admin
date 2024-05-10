import { Button } from '@/components/custom/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { bo } from '@/wailsjs/go/models';
import { GetMapping } from '@/wailsjs/go/service/Datastore';
import { IconEdit } from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import BaseCard from '../components/base-card';
import MappingCard from '../components/mapping-card';
import { list } from '../data/init';
import { useMapping } from '../store/mapping';

interface FormProps {
  id: number;
}

const UpdateMapping: FC<FormProps> = ({ id }) => {
  const form = useForm();
  const { update } = useMapping();
  const onSubmit = (data: any) => {
    update({ ...data, id: id });
  };

  const [currentTab, setCurrentTab] = useState('base');

  useEffect(() => {
    form.setValue('mappings', list);
  }, []);

  useEffect(() => {
    if (id) {
      GetMapping(Number(id)).then((res: bo.GetMappingResp) => {
        if (res.error) {
          return;
        }
        console.log(res.mapping);
        const sets = merge(res.mapping?.mappings || []);
        form.setValue('mappings', sets);
        form.setValue('name', res.mapping?.name);
        form.setValue('is_default', res.mapping?.is_default);
        form.setValue('desc', res.mapping?.desc);
      });
    }
  }, [id]);

  const merge = (sets: any[]): any[] => {
    const result: any[] = [];
    list.forEach((item) => {
      const s = sets.find((s) => s.to_key === item.to_key);
      if (s) {
        s.fieldType = item.fieldType;
        s.tips = item.tips;
        result.push(s);
      } else {
        result.push(item);
      }
    });
    return result;
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>
          <IconEdit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle>映射处理</DialogTitle>
          <DialogDescription>
            设置一种映射关系，用于插件之间的数据交换。
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              defaultValue='base'
              value={currentTab}
              onValueChange={setCurrentTab}
            >
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='base'>基础信息</TabsTrigger>
                <TabsTrigger value='mapping'>映射关系配置</TabsTrigger>
              </TabsList>
              <TabsContent value='base'>
                <BaseCard setCurrentTab={setCurrentTab} />
              </TabsContent>
              <TabsContent value='mapping'>
                <MappingCard setCurrentTab={setCurrentTab} />
              </TabsContent>
            </Tabs>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMapping;
