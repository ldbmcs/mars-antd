import * as allIcons from '@ant-design/icons';
import { MenuDataItem } from '@umijs/route-utils';
import React from 'react';

export const fixMenuItemIcon = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
  menus.forEach((item) => {
    const { icon, children } = item;
    if (typeof icon === 'string') {
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      // @ts-ignore
      item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    children && children.length > 0 ? (item.children = fixMenuItemIcon(children)) : null;
  });
  return menus;
};
