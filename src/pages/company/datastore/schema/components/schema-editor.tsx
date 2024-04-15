import { Button } from '@/components/custom/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState, type FC } from 'react';
import GridLayout from './grid-layout';
import Inputs from './inputs';
import TextInput from './widgets/text';

interface SchemaEditorProps {}

const SchemaEditor: FC<SchemaEditorProps> = ({}) => {
  const [items, setItems] = useState([{ id: 'item-1' }, { id: 'item-2' }]);
  return (
    <>
      <Card>
        <CardHeader className='m-2 ml-6 mr-6 rounded border p-2'>
          这里是toolbar
        </CardHeader>
        <CardContent className='flex h-[600px] flex-row space-x-2'>
          <div className='w-[300px] rounded border p-2'>
            组件栏
            <Inputs
              items={[
                <TextInput />,
                <Button>数字</Button>,
                <Button>长文本</Button>,
                <Button>布尔</Button>,
                <Button>JSON</Button>,
                <Button>数组</Button>,
              ]}
            />
          </div>
          <div className='w-full rounded border p-2'>
            <GridLayout
              items={items}
              addItem={() =>
                setItems([...items, { id: `item-${items.length + 1}` }])
              }
            />
          </div>
          <div className='w-[300px] rounded border p-2'>属性栏</div>
        </CardContent>
      </Card>
    </>
  );
};

export default SchemaEditor;
