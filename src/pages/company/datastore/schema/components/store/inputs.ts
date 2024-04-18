import { Layout } from 'react-grid-layout';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface WidgetInfo extends Layout {
  extra?: Record<string | number | symbol, any>; // 扩展信息
}

interface WigetState {
  ts: number;
  widgets: WidgetInfo[];
  find: (i: string) => WidgetInfo | undefined;
  updateExtra: (i: string, extra: any) => void;
  change: (w: WidgetInfo) => void;
  delete: (i: string) => void;
}

export const useWidgetStore = create<WigetState>()(
  immer((set, get) => ({
    ts: new Date().getTime(),
    widgets: [],
    find: (i: string) => {
      console.log('get', get().widgets);
      return get().widgets.find((cm) => cm.i === i);
    },
    change: (w: WidgetInfo) => {
      let cw = get().widgets.find((w1) => w1.i === w.i);
      if (cw) {
        set((state) => {
          state.widgets = state.widgets.map((w1) => {
            if (w1.i === w.i) {
              return w;
            }
            return w1;
          });
          state.ts = new Date().getTime();
        });
        return;
      }

      set((state) => {
        state.widgets.push(w);
        state.widgets = state.widgets;
        state.ts = new Date().getTime();
      });
    },
    updateExtra: (i: string, extra: any) => {
      let cw = get().widgets.find((w1) => w1.i === i);
      if (cw) {
        set((state) => {
          state.widgets = state.widgets.map((w1) => {
            if (w1.i === i) {
              w1.extra = extra;
            }
            return w1;
          });
          state.ts = new Date().getTime();
        });
        return;
      }
    },

    delete: (i: string) => {
      set((state) => {
        state.widgets = state.widgets.filter((w) => w.i !== i);
        state.ts = new Date().getTime();
      });
    },
  }))
);
