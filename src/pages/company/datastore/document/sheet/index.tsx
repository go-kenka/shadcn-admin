import { Button } from '@/components/custom/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  GetDatastoreMenus,
  GetSheetData,
  SetSheetData,
} from '@/wailsjs/go/service/Datastore';
import { IconHelpCircle } from '@tabler/icons-react';
import { ICommandInfo, IExecutionOptions, IRange } from '@univerjs/core';
import { FUniver } from '@univerjs/facade';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MenuBar } from '../components/menubar';
import UniverSheet from './univer-sheet';
import { getDefaultWorkbookData } from './univer-sheet/data.ts';

const notAllowedCommands = [
  'sheet.command.insert-col',
  'sheet.command.remove-col',
  'sheet.command.insert-sheet',
  'sheet.command.remove-sheet',
];

function Sheet() {
  const { did } = useParams();
  const [data, setData] = useState(() => getDefaultWorkbookData({ did }));
  const [selections, setSelections] = useState<any>();
  const [menus, setMenus] = useState<bo.Menu[]>([]);

  useEffect(() => {
    if (did) {
      GetDatastoreMenus(Number(did)).then((menus) => {
        console.log(menus);
        setMenus(menus.menus || []);
      });
    }
  }, [did]);

  const univerRef = useRef<{
    getData: () => any;
    onSelectionChange: (selection: any) => void;
    univerAPI: React.RefObject<any>;
  }>(null);

  // 同步数据
  const update = useCallback(
    debounce((data: any) => {
      console.log('update', data);

      SetSheetData(Number(did), data).then((res) => {
        if (res.error) {
          toast({ title: 'Error', description: res.error });
        }
        console.log('update success', data);
      });
    }, 1000),
    []
  );

  useEffect(() => {
    const univerAPI: FUniver = univerRef.current?.univerAPI.current;

    const { dispose } = univerAPI?.onCommandExecuted((command: any) => {
      [command]
        .filter(
          // Filter by type, only show the following types
          // 0: Command, 1: Operation, 2: Mutation
          (cmd: Readonly<ICommandInfo>) =>
            [0, 1, 2].indexOf(cmd.type ?? -1) !== -1
        )
        .filter(
          // Filter by id, only show the following ids
          (cmd: Readonly<ICommandInfo>) =>
            ![
              /^doc./, // doc
              /^formula-ui./, // formula-ui
              /formula/, //  formula
              /set-selections/, // selection change
              /set-activate-cell-edit/, // change cell edit
              // /set-cell-edit-visible/, // floating cell edit
            ].find((rule) => {
              if (rule instanceof RegExp) {
                return rule.test(cmd.id);
              } else {
                return rule === cmd.id;
              }
            })
        )
        .map((cmd) => console.log('Command:', cmd.id, 'Params:', cmd.params));
    });

    return () => {
      dispose?.();
    };
  }, []);

  useEffect(() => {
    if (did) {
      GetSheetData(Number(did)).then((res) => {
        if (res && res.data) {
          setData((res.data as any) ?? getDefaultWorkbookData({ did }));
        }
      });
    }
  }, [did]);

  useEffect(() => {
    const univerAPI: FUniver = univerRef.current?.univerAPI.current;

    const onBefore = univerAPI.onBeforeCommandExecute(
      (command: Readonly<ICommandInfo<any>>) => {
        console.log(
          'beforeCommandExecute',
          command,
          notAllowedCommands.includes(command.id)
        );

        // 不允许添加和删除列和添加或者删除表格
        if (notAllowedCommands.includes(command.id)) {
          console.log('Command not allowed');
          throw new Error('Command not allowed');
        }

        // // 仅同步本地 mutation
        // if (
        //   command.type === 2 ||
        //   options?.fromCollab ||
        //   options?.onlyLocal ||
        //   command.id === 'doc.mutation.rich-text-editing'
        // ) {
        //   throw new Error('Command not allowed');
        // }
      }
    );

    const onCommandExecuted = univerAPI.onCommandExecuted(
      async (
        command: Readonly<ICommandInfo<any>>,
        options?: IExecutionOptions
      ) => {
        // 仅同步本地 mutation
        if (
          command.type !== 2 ||
          options?.fromCollab ||
          options?.onlyLocal ||
          command.id === 'doc.mutation.rich-text-editing'
        ) {
          return;
        }

        // 同步数据
        update(univerRef.current?.getData());
      }
    );

    return () => {
      onBefore.dispose();
      onCommandExecuted.dispose();
    };
  });

  return (
    <div className='flex h-full w-full flex-col gap-1'>
      <div className='flex flex-row items-center gap-2'>
        <Button>编辑</Button>
        <MenuBar items={menus} disabled={false} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconHelpCircle className='h-4 w-4' />
            </TooltipTrigger>
            <TooltipContent>
              所有处理都将以当前选择行为基准，不论你选择的是多少列，在处理过程中，都会读取当前行的所有列进行数据加工
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className='text-xs text-red-500'>
          当前选择行：
          {selections?.startRow + 1 + '-' + (selections?.endRow + 1)}
        </span>
      </div>
      <div className='h-[calc(100vh-320px)] rounded'>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <UniverSheet
            className='flex-1 rounded border'
            ref={univerRef}
            data={data}
            onSelectionChange={(selections: IRange[]) => {
              if (selections.length > 0) {
                const range = selections[0];
                setSelections(range);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sheet;
