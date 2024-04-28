import { Component } from '@/data/scheam';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import createSelectors from './selectors';

let defaultDropItem = { i: nanoid(5), w: 1, h: 1 };
let textareaDropItem = { i: nanoid(5), w: 1, h: 2 };
let jsonDropItem = { i: nanoid(5), w: 2, h: 2 };
let arrayDropItem = { i: nanoid(5), w: 1, h: 2 };
let imageDropItem = { i: nanoid(5), w: 1, h: 2 };

type dropItemType = 'textarea' | 'json' | 'default' | 'array' | 'image';

// 定义状态的结构
interface StoreState {
  cols: number;
  droppingItem: { i: string; w: number; h: number };
  componentList: Component[]; // 组件栏中的组件列表
  panelComponents: Component[]; // 面板中的组件列表
  selectedComponent: Component | null; // 当前选中的组件
}

interface StoreActions {
  setCols: (cols: number) => void; // 更新布局的列数
  updateComponentList: (newComponentList: Component[]) => void; // 更新组件栏中的组件列表
  updatePanelComponents: (newPanelComponents: Component[]) => void; // 更新面板中的组件列表
  updateSelectedComponent: (selectedComponent: Component | null) => void; // 更新选中的组件
  updateDropItme: (type: dropItemType) => void; // 更新选中的组件
  preview: () => Component[]; // 更新选中的组件
  selected: () => Component | null; // 获取选中的组件
}

// 初始状态
const initialState: StoreState = {
  cols: 2,
  droppingItem: defaultDropItem,
  componentList: [],
  panelComponents: [],
  selectedComponent: null,
};

// 创建并导出状态管理的 hook
const useStoreBase = create<StoreState & StoreActions>()((set, get) => ({
  ...initialState,
  // 更新布局的列数
  setCols: (cols: number) => set(() => ({ cols })),
  // 更新组件栏中的组件列表
  updateComponentList: (newComponentList: Component[]) =>
    set(() => ({ componentList: newComponentList })),
  // 更新面板中的组件列表
  updatePanelComponents: (newPanelComponents: Component[]) =>
    set((state) => {
      let selectedComponent = state.selectedComponent;
      const old = cloneDeep(state.panelComponents);
      const temp = newPanelComponents.map((component) => {
        if (component.i === selectedComponent?.i) {
          selectedComponent = component;
        }

        const oldComponent = old.find((item) => item.i === component.i);
        if (oldComponent) {
          return { ...oldComponent, ...component };
        }
        return component;
      });

      return { panelComponents: temp, selectedComponent: selectedComponent };
    }),
  // 更新选中的组件
  updateSelectedComponent: (selectedComponent: Component | null) =>
    set((state) => {
      if (selectedComponent) {
        // 更新选中组件信息
        const updatedPanelComponents = state.panelComponents.map(
          (component) => {
            if (component.i === selectedComponent.i) {
              return selectedComponent;
            }
            return component;
          }
        );

        return {
          selectedComponent: selectedComponent,
          panelComponents: updatedPanelComponents,
        };
      }
      return { selectedComponent: null };
    }),
  // 更新选中的组件
  updateDropItme: (type: dropItemType) => {
    set(() => {
      if (type === 'textarea') {
        return { droppingItem: textareaDropItem };
      }
      if (type === 'json') {
        return { droppingItem: jsonDropItem };
      }
      if (type === 'array') {
        return { droppingItem: arrayDropItem };
      }
      if (type === 'image') {
        return { droppingItem: imageDropItem };
      }
      return { droppingItem: defaultDropItem };
    });
  },
  preview: () => {
    return get().panelComponents;
  },
  selected: () => {
    return get().selectedComponent;
  },
}));

export default createSelectors(useStoreBase);
