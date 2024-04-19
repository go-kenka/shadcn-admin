import { Layout } from 'react-grid-layout';
import { create } from 'zustand';
import createSelectors from './selectors';

// 定义组件的结构
export interface Component extends Layout {
  extra: {
    name: string;
    [key: string]: any;
  }; // 其他可能的组件信息
}

// 定义状态的结构
interface StoreState {
  componentList: Component[]; // 组件栏中的组件列表
  panelComponents: Component[]; // 面板中的组件列表
  selectedComponent: Component | null; // 当前选中的组件
}

interface StoreActions {
  updateComponentList: (newComponentList: Component[]) => void; // 更新组件栏中的组件列表
  updatePanelComponents: (newPanelComponents: Component[]) => void; // 更新面板中的组件列表
  updateSelectedComponent: (selectedComponent: Component | null) => void; // 更新选中的组件
}

// 初始状态
const initialState: StoreState = {
  componentList: [],
  panelComponents: [],
  selectedComponent: null,
};

// 创建并导出状态管理的 hook
const useStoreBase = create<StoreState & StoreActions>()((set) => ({
  ...initialState,
  // 更新组件栏中的组件列表
  updateComponentList: (newComponentList: Component[]) =>
    set(() => ({ componentList: newComponentList })),
  // 更新面板中的组件列表
  updatePanelComponents: (newPanelComponents: Component[]) =>
    set(() => ({ panelComponents: newPanelComponents })),
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
}));

export default createSelectors(useStoreBase);
