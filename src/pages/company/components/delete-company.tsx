import { Button } from '@/components/custom/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { FC } from 'react';
import { useCompanyStore } from '../store/company';

interface DeleteCompanyProps {
  id: number;
}

const DeleteCompany: FC<DeleteCompanyProps> = ({ id }) => {
  const del = useCompanyStore((state) => state.delete);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size={'sm'}>
          <Cross2Icon className='h-5' />
          删除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>操作警告</AlertDialogTitle>
          <AlertDialogDescription>
            当前操作不能恢复，请你确认是否继续？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => del(id)}
            className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
          >
            彻底删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCompany;
