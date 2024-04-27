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
import { GearIcon } from '@radix-ui/react-icons';
import { useEffect, useState, type FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../store/datastore';

interface UpdateDatastoreProps {
  id: number;
}

type IFormInput = {
  c_id: number;
  name: string;
  desc: string;
  aid?: number;
};

const UpdateDatastore: FC<UpdateDatastoreProps> = ({ id }) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const { update, ds } = useDataStore();

  const { cid } = useParams();
  const [adapters, setAdapters] = useState<bo.Adapter[]>([]);

  useEffect(() => {
    SearchAdapters({
      page: {
        num: 1,
        size: 1000,
      },
      id: 0,
      name: '',
    }).then((res) => {
      console.log(res);
      setAdapters(res.list || []);
    });
  }, [id]);

  useEffect(() => {
    const d = ds.find((c) => c.id === id);
    setValue('c_id', Number(cid));
    setValue('name', d?.name || '');
    setValue('desc', d?.desc || '');
    setValue('aid', d?.aid || 0);
  }, [id]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await update({ ...data, id });
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'sm'}>
          <GearIcon className='h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>修改仓库</DialogTitle>
            <DialogDescription>
              仓库是一个数据集合，用于区别不同的商品类型。
            </DialogDescription>
          </DialogHeader>

          <div className='gap-4 py-4'>
            <div className='items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                名称
              </Label>
              <Input
                {...register('name')}
                className='col-span-3'
                placeholder='请输入供应商名称'
              />
            </div>
            <div className='items-center gap-4'>
              <Label htmlFor='aid' className='text-right'>
                适配器
              </Label>
              <Select>
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
            </div>
            <div className='items-center gap-4'>
              <Label htmlFor='desc' className='text-right'>
                描述
              </Label>
              <Input
                {...register('desc')}
                className='col-span-3'
                placeholder='请详细描述一下'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button type='submit'>保存</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDatastore;
