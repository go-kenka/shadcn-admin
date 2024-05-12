import { Button } from '@/components/custom/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { bo } from '@/wailsjs/go/models';
import { IconCirclesRelation, IconPlus } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import BindingForm from '../form/binding';
import DeleteBinding from '../form/delete-binding';
import { useBindingAdapter } from '../store/adapter';

interface BindingAdaptersProps {
  mid: number;
}

const BindingAdapters: FC<BindingAdaptersProps> = ({ mid }) => {
  const { list, search } = useBindingAdapter();
  const [selectedAdapter, setSelectedAdapter] = useState<
    bo.Adapter | undefined
  >(undefined);

  useEffect(() => {
    search(mid);
  }, [mid]);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button size={'sm'} variant={'outline'}>
            <IconCirclesRelation className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent className='sm:max-w-2xl'>
          <SheetHeader>
            <SheetTitle className='flex items-center gap-4'>
              插件配置
              <Button
                size={'sm'}
                variant={'outline'}
                onClick={() => setSelectedAdapter(undefined)}
              >
                <IconPlus className='h-4 w-4' />
              </Button>
            </SheetTitle>
            <SheetDescription>请选择插件并配置插件参数</SheetDescription>
          </SheetHeader>
          <div className='grid grid-cols-2 gap-4 pb-2 pt-2'>
            {list.map((adapter) => (
              <Card className='w-full'>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <span
                      className='cursor-pointer'
                      onClick={() => setSelectedAdapter(adapter)}
                    >
                      {adapter.manifest?.name}
                    </span>
                    <DeleteBinding mid={mid} aid={adapter.id || 0} />
                  </CardTitle>
                  <CardDescription>
                    {adapter.manifest?.id} -v{adapter.manifest?.version}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div>
            <BindingForm mid={mid} aid={selectedAdapter?.id} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BindingAdapters;
