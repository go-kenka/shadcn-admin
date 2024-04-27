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
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../store/datastore';

interface CreateDatastoreProps {}

type IFormInput = {
  c_id: number;
  name: string;
  desc: string;
  aid?: number;
};

const CreateDatastore: FC<CreateDatastoreProps> = ({}) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const add = useDataStore((state) => state.add);
  const { cid } = useParams();
  const [adapters, setAdapters] = useState<bo.Adapter[]>([]);

  useEffect(() => {
    setValue('c_id', Number(cid));
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
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} className='gap-2'>
          <IconPlus className='w-5' /> 添加
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>添加仓库</DialogTitle>
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

export default CreateDatastore;
