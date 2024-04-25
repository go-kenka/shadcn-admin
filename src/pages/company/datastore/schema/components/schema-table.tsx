import { Button } from '@/components/custom/button';
import Empty from '@/components/custom/emptu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { UpdateDatastoreSchema } from '@/wailsjs/go/service/Datastore';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useNavigate, useParams } from 'react-router-dom';
import useWidgetStore from './store/inputs';
import './styles.css';

export const ReactGridLayout = WidthProvider(RGL);

export interface SchemaTableProps {
  className?: string;
  defaultWidth?: number;
}

export const SchemaTable: React.FC<SchemaTableProps> = ({
  className = 'layout1',
  defaultWidth = 120,
}) => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [id, setId] = useState(0);
  const [primary, setPrimary] = useState('');
  const cols = useWidgetStore.use.cols();
  const widgets = useWidgetStore.use.panelComponents();
  const update = useWidgetStore.use.updatePanelComponents();
  const [components, setComponents] = useState(cloneDeep(widgets));

  useEffect(() => {
    setComponents(cloneDeep(widgets));
  }, [widgets]);

  useEffect(() => {
    setId(Number(cid));
  }, [cid]);

  // 保存处理
  const save = async () => {
    if (!primary) {
      toast({
        title: '错误',
        description: '请先设置主键',
      });
      return;
    }

    const fields = components.map((c, i) => {
      return {
        name: c.extra?.title ?? '',
        type: c.extra?.widget ?? '',
        widget: c.extra?.widget ?? '',
        key: c.extra?.name ?? '',
        pk: c.extra?.name === primary,
        width: c.extra?.width ?? defaultWidth,
        order: i + 1,
      };
    });

    const res = await UpdateDatastoreSchema({
      id: id,
      schema: { cols: cols, components: components },
      fields: fields,
      primary_key: primary,
    });
    if (res.error) {
      toast({
        title: '错误',
        description: `保存失败：${res.error}`,
      });
      return;
    }

    toast({
      title: '成功',
      description: '保存成功',
    });
    navigate(-1);
  };

  const body = () => {
    if (components.length === 0) return <Empty />;

    return (
      <>
        <Table className={`${className} flex-1`}>
          <TableCaption>
            表格数据的显示效果与现在设置的宽度、顺序有关。
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>排序</TableHead>
              <TableHead>字段名</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>标题</TableHead>
              <TableHead className='w-[120px]'>宽度</TableHead>
              <TableHead className='text-right'>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((cm, i) => (
              <TableRow
                key={cm.i}
                className={cm.extra?.name === primary ? 'bg-green-100' : ''}
              >
                <TableCell className='font-medium'>{i + 1}</TableCell>
                <TableCell>{cm.extra?.name}</TableCell>
                <TableCell>{cm.extra?.widget}</TableCell>
                <TableCell>{cm.extra?.title}</TableCell>
                <TableCell>
                  <Input
                    type='number'
                    min={60}
                    max={500}
                    value={cm.extra?.width ?? defaultWidth}
                    onChange={(e) => {
                      const cms = cloneDeep(components);
                      const changes = cms.map((c) => {
                        if (c.i === cm.i) {
                          c.extra!.width = Number(e.target.value);
                        }
                        return c;
                      });
                      update(changes);
                    }}
                  />
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='outline'
                    disabled={cm.extra?.name === primary}
                    onClick={() => {
                      const selected = components.find((c) => c.i === cm.i);
                      if (selected) {
                        setPrimary(selected.extra?.name ?? '');
                      }
                    }}
                  >
                    主键
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>保存</Button>
      </DialogTrigger>
      <DialogContent className='flex max-w-[800px] flex-col gap-4'>
        <DialogHeader>
          <DialogTitle>表格预览设置（宽度与顺序）</DialogTitle>
        </DialogHeader>
        {body()}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>取消</Button>
          </DialogClose>
          <Button variant={'default'} onClick={save}>
            提交
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchemaTable;
