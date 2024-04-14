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
import { useEffect, type FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCompanyStore } from '../store/company';

interface UpdateCompanyProps {
  id: number;
}

type IFormInput = {
  name: string;
  desc: string;
};

const UpdateCompany: FC<UpdateCompanyProps> = ({ id }) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const update = useCompanyStore((state) => state.update);
  useEffect(() => {
    const company = useCompanyStore.getState().cms.find((c) => c.id === id);
    setValue('name', company?.name || '');
    setValue('desc', company?.desc || '');
  }, [id]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await update(id, data.name, data.desc);
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>编辑</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>修改供应商</DialogTitle>
            <DialogDescription>
              供应商是一个数据来源方，用于区别不同的供货商
            </DialogDescription>
          </DialogHeader>

          <div className='gap-4 py-4'>
            <div className='items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                名称
              </Label>
              <Input {...register('name')} className='col-span-3' />
            </div>
            <div className='items-center gap-4'>
              <Label htmlFor='desc' className='text-right'>
                描述
              </Label>
              <Input {...register('desc')} className='col-span-3' />
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

export default UpdateCompany;
