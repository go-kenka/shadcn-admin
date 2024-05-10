import { Editor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { useFormContext } from 'react-hook-form';

interface CodeEditorProps {
  name: string;
  label: string;
}

const CodeEditor: FC<CodeEditorProps> = ({ name, label }) => {
  const { setValue, getValues } = useFormContext();
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState(defaultFn);

  const onChange = (value: string | undefined) => {
    console.log(value);
    setValue('from_key', value);
  };

  useEffect(() => {
    const val = getValues('from_key');
    setVal(val ? defaultFn : val);
  }, [JSON.stringify(getValues())]);

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Input placeholder='点击输入函数' width={140} name={name} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑函数「{label}」</DialogTitle>
          <DialogDescription>
            你可以获取当前行的数据，并进行一些处理，例如拼接字符串，计算等。
          </DialogDescription>
        </DialogHeader>
        <Editor
          height='600px'
          defaultLanguage='javascript'
          onChange={onChange}
          value={val}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CodeEditor;
