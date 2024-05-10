import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/custom/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { IconCirclesRelation } from '@tabler/icons-react';

interface FormProps {
  id: number;
}

const BindingForm: FC<FormProps> = ({}) => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>
          <IconCirclesRelation className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle>插件配置</DialogTitle>
          <DialogDescription>请选择插件并配置插件参数</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'>
            <Card className='h-[300px] w-full'></Card>
            <DialogFooter className='mt-2'>
              <Button type='submit'>提交</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default BindingForm;
