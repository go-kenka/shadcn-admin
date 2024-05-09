import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { bo } from '@/wailsjs/go/models';
import { nanoid } from 'nanoid';
import { FC } from 'react';

// 菜单项组件
export const MenuItem: FC<{ item: bo.Menu }> = ({ item }) => {
  // 如果有子菜单，递归渲染子菜单
  if (item.children) {
    return (
      <MenubarSub>
        <MenubarSubTrigger>{item.name}</MenubarSubTrigger>
        <MenubarSubContent>
          {item.children.map((child, i) => (
            <MenuItem key={nanoid(5)} item={child} />
          ))}
        </MenubarSubContent>
      </MenubarSub>
    );
  } else {
    // 如果没有子菜单，渲染一个普通的菜单项
    return <MenubarItem key={item.method}>{item.name}</MenubarItem>;
  }
};

// 顶层菜单组件
export const MenuBar: FC<{ items: bo.Menu[]; disabled: boolean }> = ({
  items,
  disabled,
}) => {
  return (
    <Menubar>
      {items.map((item, i) => (
        <MenubarMenu key={i}>
          <MenubarTrigger
            disabled={disabled}
            className={disabled ? 'text-gray-400' : ''}
          >
            {item.name}
          </MenubarTrigger>
          <MenubarContent>
            {item.children &&
              item.children.map((child) => (
                <MenuItem key={nanoid(5)} item={child} />
              ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};
