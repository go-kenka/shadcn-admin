import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState, type FC } from 'react';
import useWidgetStore from '../../store/inputs';

interface ArrayInputSettingProps {
  extra: { name: string; title: string; placeholder: string; desc: string };
}

// name: 'text',
// title: '文本',
// placeholder: '请输入内容',
// desc: '',

const ArrayInputSetting: FC<ArrayInputSettingProps> = ({ extra }) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');
  const [placeholderValue, setPlaceholderValue] = useState<string>('');
  const [descValue, setDescValue] = useState<string>('');

  const update = useWidgetStore.use.updateSelectedComponent();
  const selected = useWidgetStore.use.selectedComponent();

  useEffect(() => {
    if (extra) {
      setNameValue(extra.name);
      setTitleValue(extra.title);
      setPlaceholderValue(extra.placeholder);
      setDescValue(extra.desc);
    }
  }, [JSON.stringify(extra)]);

  useEffect(() => {
    if (selected && nameValue && titleValue && placeholderValue && descValue) {
      const nObj = {
        ...selected,
        extra: {
          ...selected.extra,
          name: nameValue,
          title: titleValue,
          placeholder: placeholderValue,
          desc: descValue,
        },
      };
      update(nObj);
    }
  }, [nameValue, titleValue, placeholderValue, descValue]);

  return (
    <>
      <div className='grid gap-2'>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='name'>字段</Label>
          <Input
            type='text'
            id='name'
            value={nameValue}
            placeholder='名称'
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='title'>标题</Label>
          <Input
            type='text'
            id='title'
            value={titleValue}
            placeholder='标题'
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='placeholder'>提示</Label>
          <Input
            type='text'
            id='placeholder'
            value={placeholderValue}
            placeholder='提示'
            onChange={(e) => setPlaceholderValue(e.target.value)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='desc'>详细说明</Label>
          <Input
            type='text'
            id='desc'
            value={descValue}
            placeholder='详细说明'
            onChange={(e) => setDescValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ArrayInputSetting;
