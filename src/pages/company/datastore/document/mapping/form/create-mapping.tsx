import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/custom/button.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { IconPlus } from '@tabler/icons-react';
import BaseCard from './base-card.tsx';
import MappingCard from './mapping-card.tsx';
import { list } from '../data/init.ts';

interface FormProps {}

const CreateMapping: FC<FormProps> = ({}) => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  const [currentTab, setCurrentTab] = useState('base');

  useEffect(() => {
    methods.setValue('mappings', list);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <IconPlus className='h-4 w-4' />
          添加
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle>映射处理</DialogTitle>
          <DialogDescription>
            设置一种映射关系，用于插件之间的数据交换。
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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

export default CreateMapping;
