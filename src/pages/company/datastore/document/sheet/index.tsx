import { useEffect, useRef, useState } from 'react';
import {
  SetWorksheetColWidthMutation,
  SetWorksheetRowHeightMutation,
} from '@univerjs/sheets';
import { getDefaultWorkbookData } from '@/pages/company/datastore/document/sheet/univer-sheet/data.ts';
import UniverSheet from '@/pages/company/datastore/document/sheet/univer-sheet';

function App() {
  const [data, setData] = useState(() => getDefaultWorkbookData());
  const univerRef = useRef<{
    getData: () => any;
    univerAPI: React.RefObject<any>;
  }>(null);

  useEffect(() => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI.current;

    const { dispose } = univerAPI?.onCommandExecuted((command: any) => {
      [command]
        .filter(
          // Filter by type, only show the following types
          (cmd: any) =>
            /**
             * @see https://univer.ai/guides/architecture/architecture/#%E5%91%BD%E4%BB%A4%E7%B3%BB%E7%BB%9F
             */
            [
              0, // Command
              1, // Operation
              2, // Mutation
            ].indexOf(cmd.type) !== -1
        )
        .filter(
          // Filter by id, only show the following ids
          (cmd: any) =>
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

  // increment cell value
  const increment = () => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI?.current;
    if (!univerAPI) throw Error('univerAPI undone');
    const range = univerAPI.getActiveWorkbook().getActiveSheet().getRange(0, 0);
    const oldVal = isNaN(Number(range.getValue()))
      ? 0
      : Number(range.getValue());
    range.setValue(oldVal + 1);
  };

  const logSelection = () => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI?.current;
    if (!univerAPI) throw Error('univerAPI undone');
    const selection = univerAPI
      .getActiveWorkbook()
      .getActiveSheet()
      .getSelection();
    const range = selection.getActiveRange();
    console.log(
      'current selection:',
      'x',
      range.getColumn(),
      'y',
      range.getRow(),
      'cell width',
      range.getWidth(),
      'cell height',
      range.getHeight()
    );
  };

  const changeCellSize = () => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI?.current;
    if (!univerAPI) throw Error('univerAPI undone');

    const activeWorkbook = univerAPI.getActiveWorkbook();
    const activeSheet = activeWorkbook.getActiveSheet();

    univerAPI.executeCommand(SetWorksheetRowHeightMutation.id, {
      unitId: activeWorkbook.getId(),
      subUnitId: activeSheet._worksheet.getSheetId(),
      ranges: [
        {
          startColumn: 1,
          endColumn: 1,
          startRow: 1,
          endRow: 1,
        },
      ],
      rowHeight: 20 + Math.ceil(Math.random() * 40),
    });

    univerAPI.executeCommand(SetWorksheetColWidthMutation.id, {
      unitId: activeWorkbook.getId(),
      subUnitId: activeSheet._worksheet.getSheetId(),
      ranges: [
        {
          startColumn: 1,
          endColumn: 1,
          startRow: 1,
          endRow: 1,
        },
      ],
      colWidth: 20 + Math.ceil(Math.random() * 40),
    });
  };

  const changeStyleByAPI = () => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI?.current;
    if (!univerAPI) throw Error('univerAPI undone');

    const activeWorkbook = univerAPI.getActiveWorkbook();
    const activeSheet = activeWorkbook.getActiveSheet();
    const range = activeSheet.getRange(0, 0);

    range.setValue('center');
    /**
     * @see https://univer.ai/api/facade/classes/FRange.html#setHorizontalAlignment
     */
    range.setHorizontalAlignment('center');
  };

  /**
   * change style by command
   * @description use command you can set any style you want, not just facade api provided style
   */
  const changeStyleByCommand = () => {
    /** @type { import("@univerjs/facade").FUniver } */
    const univerAPI = univerRef.current?.univerAPI?.current;
    if (!univerAPI) throw Error('univerAPI undone');

    const activeWorkbook = univerAPI.getActiveWorkbook();
    const activeSheet = activeWorkbook.getActiveSheet();
    const range = activeSheet.getRange(0, 0);
    range.setValue('center');

    /**
     * @see https://univer.ai/api/sheets/interfaces/ISetStyleCommandParams.html
     */
    univerAPI.executeCommand('sheet.command.set-style', {
      unitId: activeWorkbook.getId(),
      subUnitId: activeSheet._worksheet.getSheetId(),
      range: {
        startColumn: 0,
        endColumn: 0,
        startRow: 0,
        endRow: 0,
      },
      /**
       * @see https://univer.ai/api/sheets/interfaces/IStyleTypeValue.html
       * @see https://univer.ai/api/core/interfaces/IStyleData.html
       */
      style: {
        type: 'ht',
        /**
         * @see https://univer.ai/api/core/enums/HorizontalAlign.html
         */
        value: 2,
      },
    });
  };

  const reloadData = () => {
    setData(getDefaultWorkbookData(Math.random().toString()));
  };

  return (
    <div className='h-[calc(100vh-250px)] rounded border'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className='bar' style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              console.log(univerRef.current?.getData());
            }}
            title='Get workbook data output in console'
          >
            Get Data
          </button>
          <button
            onClick={increment}
            title='Increment the value of the first cell'
          >
            Increment
          </button>
          <button
            onClick={changeCellSize}
            title='Change the size of the B2 cell'
          >
            changeCellSize
          </button>
          <button onClick={reloadData} title='Reload data by random'>
            reloadData
          </button>
          <button onClick={changeStyleByAPI} title='Change style by Facade API'>
            changeStyle1
          </button>
          <button
            onClick={changeStyleByCommand}
            title='Change style by Command'
          >
            changeStyle2
          </button>
        </div>
        <UniverSheet
          className='flex-1'
          ref={univerRef}
          data={data}
          onClick={() => {
            console.log('click');
            logSelection();
          }}
          onDbClick={() => {
            console.log('dbClick');
            logSelection();
          }}
        />
      </div>
    </div>
  );
}

export default App;
