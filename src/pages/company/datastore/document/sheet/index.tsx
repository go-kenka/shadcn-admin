import { toast } from '@/components/ui/use-toast';
import UniverSheet from '@/pages/company/datastore/document/sheet/univer-sheet';
import { getDefaultWorkbookData } from '@/pages/company/datastore/document/sheet/univer-sheet/data.ts';
import { GetSheetData, SetSheetData } from '@/wailsjs/go/service/Datastore';
import { ICommandInfo, IExecutionOptions } from '@univerjs/core';
import { FUniver } from '@univerjs/facade';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const { did } = useParams();
  const [data, setData] = useState(() => getDefaultWorkbookData({ did }));
  const univerRef = useRef<{
    getData: () => any;
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
    GetSheetData(Number(did)).then((res) => {
      if (res.data) {
        setData((res.data as any) ?? getDefaultWorkbookData({ did }));
      }
    });
  }, [did]);

  useEffect(() => {
    const univerAPI: FUniver = univerRef.current?.univerAPI.current;

    univerAPI.onCommandExecuted(
      async (command: Readonly<ICommandInfo>, options?: IExecutionOptions) => {
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
  });

  return (
    <div className='h-[calc(100vh-200px)] rounded border'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <UniverSheet
          className='flex-1'
          ref={univerRef}
          data={data}
          onClick={() => {
            console.log('click');
          }}
          onDbClick={() => {
            console.log('dbClick');
          }}
        />
      </div>
    </div>
  );
}

export default App;
