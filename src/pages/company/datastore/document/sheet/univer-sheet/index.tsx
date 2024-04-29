import '@univerjs/design/lib/index.css';
import '@univerjs/sheets-formula/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/ui/lib/index.css';
import './index.css';

import { Univer } from '@univerjs/core';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { FUniver } from '@univerjs/facade';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { dark } from './theme';
// 在这里导入你自定义的主题

interface UniverSheetProps {
  data: any;
  className?: string;
  onClick?: (e: any) => void;
  onDbClick?: () => void;
}

interface UniverSheetRefObject {
  getData: () => any;
  univerAPI: React.RefObject<FUniver>;
}

export const UniverSheet = forwardRef<UniverSheetRefObject, UniverSheetProps>(
  ({ data, className, onClick, onDbClick }, ref) => {
    const univerRef = useRef<Univer | null>(null);
    const workbookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    /** @type {React.RefObject<FUniver>} */
    const fUniverRef = useRef<FUniver | null>(null);

    useImperativeHandle(ref, () => ({
      getData,
      univerAPI: fUniverRef,
    }));

    /**
     * Initialize univer instance and workbook instance
     * @param data {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
     */
    const init = (data = {}) => {
      if (!containerRef.current) {
        throw Error('container not initialized');
      }
      const univer = new Univer({
        theme: dark,
      });
      univerRef.current = univer;

      // core plugins
      univer.registerPlugin(UniverRenderEnginePlugin);
      univer.registerPlugin(UniverFormulaEnginePlugin);
      univer.registerPlugin(UniverUIPlugin, {
        container: containerRef.current,
        header: true,
        footer: true,
      });

      // doc plugins
      univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
      });
      univer.registerPlugin(UniverDocsUIPlugin);

      // sheet plugins
      univer.registerPlugin(UniverSheetsPlugin);
      univer.registerPlugin(UniverSheetsUIPlugin);
      univer.registerPlugin(UniverSheetsFormulaPlugin);

      // create workbook instance
      workbookRef.current = univer.createUnit(2, data);

      // craete Facade API instance
      fUniverRef.current = FUniver.newAPI(univer);
    };

    /**
     * Destroy univer instance and workbook instance
     */
    const destroyUniver = () => {
      univerRef.current?.dispose();
      univerRef.current = null;
      workbookRef.current = null;
    };

    /**
     * Get workbook data
     */
    const getData = () => {
      if (!workbookRef.current) {
        throw new Error('Workbook is not initialized');
      }
      return workbookRef.current.save();
    };

    useEffect(() => {
      init(data);

      // let clickTime = 0;
      // let dbClickTime = 0;
      // const onClickDebounce = (e: any) => {
      //   // debounce click
      //   if (Date.now() - dbClickTime < 500) return;
      //   if (Date.now() - clickTime < 500) return;
      //   onClick?.(e);
      //   clickTime = Date.now();
      // };

      fUniverRef.current?.onCommandExecuted((_command) => {
        // if (
        //   command.id === SetSelectionsOperation.id &&
        //   command.params.type === SelectionMoveType.MOVE_END
        // ) {
        //   // mock click event
        //   setTimeout(() => {
        //     onClickDebounce?.();
        //   }, 250);
        // }
        //
        // // mock dbclick event
        // // use command name string, because command id is not exported
        // if (command.id === 'sheet.operation.set-cell-edit-visible') {
        //   // mock dbclick event
        //   if (command.params.eventType === DeviceInputEventType.Dblclick) {
        //     dbClickTime = Date.now();
        //
        //     onDbClick?.();
        //   }
        // }
      });

      return () => {
        destroyUniver();
      };
    }, [data, onClick, onDbClick]);

    return (
      <div ref={containerRef} className={`univer-container ${className}`}></div>
    );
  }
);

export default UniverSheet;
