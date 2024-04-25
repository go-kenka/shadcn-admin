import { Cross2Icon } from '@radix-ui/react-icons';
import * as fileUpload from '@zag-js/file-upload';
import { normalizeProps, useMachine } from '@zag-js/react';
import { FC, useEffect, useId, useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Button } from './button';

interface FileUploadProps extends ControllerRenderProps {
  upload?: string;
}

export const FileUpload: FC<FileUploadProps> = ({
  name,
  value,
  onChange,
  upload,
}) => {
  const [preview, setPreview] = useState<string>();
  const [state, send] = useMachine(
    fileUpload.machine({
      accept: 'image/*',
      maxFiles: 1, // 最多5个文件
      maxFileSize: 1024 * 1024 * 10, // 10MB
      id: useId(),
      name: name ?? 'file',
      onFileChange(details) {
        const file = details.acceptedFiles[0];
        onChange(inputRef?.current?.value);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview(reader.result as string);
        };
      },
    })
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const api = fileUpload.connect(state, send, normalizeProps);

  return (
    <div
      {...api.rootProps}
      className='flex flex-col items-center justify-center rounded border border-dashed p-6'
    >
      <input {...api.hiddenInputProps} ref={inputRef} />
      <Button {...api.triggerProps}>{upload ?? '文件上传'}</Button>

      <ul
        {...api.itemGroupProps}
        className='mt-2 flex h-[50px] w-full flex-col gap-2 overflow-auto'
      >
        {api.acceptedFiles.map((file) => (
          <li
            key={file.name}
            {...api.getItemProps({ file })}
            className='flex flex-row justify-between gap-2 border p-2'
          >
            <div
              {...api.getItemNameProps({ file })}
              className='flex flex-row items-center gap-2'
            >
              <img src={preview} width={40} height={40} />
              <div className='text-sm'>{file.name}</div>
            </div>
            <Button
              size={'sm'}
              variant={'destructive'}
              {...api.getItemDeleteTriggerProps({ file })}
            >
              <Cross2Icon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
