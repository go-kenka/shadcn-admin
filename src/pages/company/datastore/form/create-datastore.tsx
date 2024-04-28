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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bo } from '@/wailsjs/go/models';
import { SearchAdapters } from '@/wailsjs/go/service/Adapter';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../store/datastore';
import { FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';

interface CreateDatastoreProps {}

type IFormInput = {
  c_id: number;
  mode: string;
  name: string;
  desc: string;
  aid?: number;
};

const CreateDatastore: FC<CreateDatastoreProps> = ({}) => {
  const form = useForm<IFormInput>();
  const add = useDataStore((state) => state.add);
  const { cid } = useParams();
  const [adapters, setAdapters] = useState<bo.Adapter[]>([]);

  useEffect(() => {
    form.setValue('c_id', Number(cid));
    form.setValue('mode', 'spreadsheet');
  }, [cid]);

  useEffect(() => {
    SearchAdapters({
      page: {
        num: 1,
        size: 1000,
      },
      id: 0,
      name: '',
    }).then((res) => {
      setAdapters(res.list || []);
    });
  }, [cid]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await add({ ...data });
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
              <DialogTitle>添加仓库</DialogTitle>
              <DialogDescription>
                仓库是一个数据集合，用于区别不同的商品类型。
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
                  name='mode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>仓库模式</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='请选择仓库模式' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='spreadsheet'>电子表格</SelectItem>
                          <SelectItem value='schema'>表单模式</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className='items-center gap-4'>
                <FormField
                  control={form.control}
                  name='aid'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>适配器</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='请选择适配器' />
                        </SelectTrigger>
                        <SelectContent>
                          {adapters.map((adapter) => (
                            <SelectItem
                              key={adapter.id}
                              value={adapter.id?.toString() || ''}
                            >
                              {adapter.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

export default CreateDatastore;
