import { MenuDataItem } from '@umijs/route-utils';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.SysUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  const flattenMenus = (menus: API.SysMenuVO[]): API.SysMenuVO[] => {
    let flattened: MenuDataItem[] = [];

    menus.forEach((menu) => {
      flattened.push(menu);

      if (menu.children && menu.children.length > 0) {
        flattened = flattened.concat(flattenMenus(menu.children));
      }
    });

    return flattened;
  };

  return {
    canAdmin: currentUser && currentUser.username === 'admin',
    normalRouteFilter: (route: MenuDataItem) => {
      return flattenMenus(currentUser?.menus ?? []).some((item) => item.name === route.name);
    },
  };
}
