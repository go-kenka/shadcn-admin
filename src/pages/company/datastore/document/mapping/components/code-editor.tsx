import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Editor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import { defaultFn } from '../data/simple';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange }) => {
  const [val, setVal] = useState(defaultFn);

  useEffect(() => {
    setVal(value || defaultFn);
  }, [value]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className='line-clamp-1 w-[280px] overflow-auto rounded border p-1.5 text-xs text-gray-300'>
          {val}
        </span>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle>编辑函数</DialogTitle>
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
