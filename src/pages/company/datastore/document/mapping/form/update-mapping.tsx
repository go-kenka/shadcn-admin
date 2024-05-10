import { FC } from 'react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { IconEdit } from '@tabler/icons-react';

interface FormProps {
  id: number;
}

const UpdateMapping: FC<FormProps> = ({}) => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>
          <IconEdit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>映射处理</DialogTitle>
          <DialogDescription>
            设置一种映射关系，用于插件之间的数据交换。
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Tabs defaultValue='base' className='w-[400px]'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='base'>基础信息</TabsTrigger>
                <TabsTrigger value='mapping'>映射关系配置</TabsTrigger>
              </TabsList>
              <TabsContent value='base'>
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='name'>Name</Label>
                      <Input id='name' defaultValue='Pedro Duarte' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='username'>Username</Label>
                      <Input id='username' defaultValue='@peduarte' />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value='mapping'>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='current'>Current password</Label>
                      <Input id='current' type='password' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='new'>New password</Label>
                      <Input id='new' type='password' />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            <Button type='submit'>提交</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMapping;
