import { Layout } from 'react-grid-layout';

// 定义组件的结构

export interface Component extends Layout {
  extra?: {
    name: string;
    width: number;
    widget: widgetType;
    [key: string]: any;
  }; // 其他可能的组件信息
}
export type widgetType =
  | 'text'
  | 'textarea'
  | 'json'
  | 'number'
  | 'array'
  | 'image'
  | 'boolean';
