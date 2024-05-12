import { Button } from '@/components/custom/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useStore } from '../store/store.ts';
import { FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';

interface CreateDatastoreProps {}

type IFormInput = {
  name: string;
  desc: string;
};

const CreateStore: FC<CreateDatastoreProps> = () => {
  const form = useForm<IFormInput>();
  const { add } = useStore();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await add(data.name, data.desc);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} className='gap-2'>
          <IconPlus className='w-5' /> 添加
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>添加店铺</DialogTitle>
              <DialogDescription>
                店铺主要用于收集已经处理过的数据，用于查询和导出使用。
              </DialogDescription>
            </DialogHeader>

            <div className='gap-4 py-4'>
              <div className='items-center gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名称</FormLabel>
                      <Input
                        {...field}
                        className='col-span-3'
                        placeholder='请输入仓库名称'
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className='items-center gap-4'>
                <FormField
                  control={form.control}
                  name='desc'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名称</FormLabel>
                      <Input
                        {...field}
                        className='col-span-3'
                        placeholder='请详细描述一下'
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose>
                <Button type='submit'>保存</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStore;
