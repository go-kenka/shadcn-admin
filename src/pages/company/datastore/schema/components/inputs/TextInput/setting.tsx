import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState, type FC } from 'react';
import { useWidgetStore } from '../../store/inputs';

interface TextInputSettingProps {
  id: string;
}

// name: 'text',
// title: '文本',
// placeholder: '请输入内容',
// desc: '',

const TextInputSetting: FC<TextInputSettingProps> = ({ id }) => {
  const [nameValue, setNameValue] = useState<string>();
  const [titleValue, setTitleValue] = useState<string>();
  const [placeholderValue, setPlaceholderValue] = useState<string>();
  const [descValue, setDescValue] = useState<string>();

  const find = useWidgetStore((state) => state.find);
  const updateExtra = useWidgetStore((state) => state.updateExtra);

  useEffect(() => {
    const cw = find(id);
    if (cw) {
      setNameValue(cw.extra?.name);
      setTitleValue(cw.extra?.title);
      setPlaceholderValue(cw.extra?.placeholder);
      setDescValue(cw.extra?.desc);
    }
  }, [id]);

  useEffect(() => {
    const cw = find(id);
    if (cw && nameValue && titleValue && placeholderValue && descValue) {
      updateExtra(id, {
        name: nameValue,
        title: titleValue,
        placeholder: placeholderValue,
        desc: descValue,
      });
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

export default TextInputSetting;
