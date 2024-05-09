import '@univerjs/design/lib/index.css';
import '@univerjs/sheets-formula/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/ui/lib/index.css';
import './index.css';

import { IRange, Univer } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
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
// 在这里导入你自定义的主题

interface UniverSheetProps {
  data: any;
  className?: string;
  onSelectionChange?: (e: any) => void;
}

interface UniverSheetRefObject {
  getData: () => any;
  univerAPI: React.RefObject<FUniver>;
}

export const UniverSheet = forwardRef<UniverSheetRefObject, UniverSheetProps>(
  ({ data, className, onSelectionChange }, ref) => {
    const univerRef = useRef<Univer | null>(null);
    const workbookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fUniverRef = useRef<FUniver | null>(null);

    useImperativeHandle(ref, () => ({
      getData,
      univerAPI: fUniverRef,
    }));

    const init = (data = {}) => {
      if (!containerRef.current) {
        throw Error('container not initialized');
      }
      const univer = new Univer({
        theme: defaultTheme,
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

      // 监听选区变化
      const activeWorkbook = fUniverRef?.current?.getActiveWorkbook();
      activeWorkbook?.onSelectionChange((selections: IRange[]) => {
        onSelectionChange?.(selections);
      });
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
      return () => {
        destroyUniver();
      };
    }, [data]);

    return (
      <div ref={containerRef} className={`univer-container ${className}`}></div>
    );
  }
);

export default UniverSheet;
