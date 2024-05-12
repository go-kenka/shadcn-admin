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
import { GearIcon } from '@radix-ui/react-icons';
import { type FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStore } from '../store/store.ts';

interface UpdateDatastoreProps {
  id: number;
}

type IFormInput = {
  name: string;
  desc: string;
};

const UpdateStore: FC<UpdateDatastoreProps> = ({ id }) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const { update, list } = useStore();

  useEffect(() => {
    const d = list.find((c) => c.id === id);
    setValue('name', d?.name || '');
    setValue('desc', d?.desc || '');
  }, [id]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await update(id, data.name, data.desc);
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
            <DialogTitle>修改店铺</DialogTitle>
            <DialogDescription>
              店铺主要用于收集已经处理过的数据，用于查询和导出使用。
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
                placeholder='请输入店铺名称'
              />
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

export default UpdateStore;
