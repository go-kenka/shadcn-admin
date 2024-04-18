import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState, type FC } from 'react';
import GridLayout from './grid-layout';
import Inputs from './inputs';
import TextInputSetting from './inputs/TextInput/setting';
import { useWidgetStore } from './store/inputs';
import ArrayInput from './toolbox/array';
import BooleanInput from './toolbox/boolean';
import ImageInput from './toolbox/image';
import JsonInput from './toolbox/json';
import NumberInput from './toolbox/number';
import TextInput from './toolbox/text';
import TextareaInput from './toolbox/textarea';

interface SchemaEditorProps {}

const SchemaEditor: FC<SchemaEditorProps> = ({}) => {
  const [items, setItems] = useState([{ id: 'item-1' }, { id: 'item-2' }]);
  const [current, setCurrent] = useState<string>('');

  const setting = () => {
    const item = useWidgetStore((s) => s.find)(current);
    const extra = item?.extra;
    switch (extra?.widget) {
      case 'text':
        return <TextInputSetting id={current}></TextInputSetting>;
      default:
        break;
    }
    return (
      <div className='flex h-5/6 items-center justify-center rounded border'>
        什么都没有
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className='m-4 ml-6 mr-6 rounded border p-2'>
          这里是toolbar
        </CardHeader>
        <CardContent className='flex h-[calc(100vh-200px)] flex-row space-x-2'>
          <div className='w-[310px] rounded border p-2'>
            组件栏
            <Inputs
              items={[
                <TextInput key={'text'} />,
                <NumberInput key={'number'} />,
                <TextareaInput key={'area'} />,
                <BooleanInput key={'bool'} />,
                <ImageInput key={'image'} />,
                <ArrayInput key={'array'} />,
                <JsonInput key={'json'} />,
              ]}
            />
          </div>
          <div className='w-full overflow-auto rounded border p-2'>
            <GridLayout select={setCurrent} />
          </div>
          <div className='w-[400px] rounded border p-2'>
            <div>属性栏</div>
            {setting()}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SchemaEditor;
