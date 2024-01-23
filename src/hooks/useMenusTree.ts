import { DataNode } from 'antd/lib/tree';
import { useEffect, useState } from 'react';

const useMenusTree = (menusTreeApi: () => Promise<API.ApiResultListSysMenuVO_>) => {
  const [menus, setMenus] = useState<DataNode[]>([]);

  function formatTreeList(list: API.SysMenuVO[]) {
    list.map((item) => {
      if (item['children']) {
        item.children = formatTreeList(item.children);
      }
      return item;
    });
    return list;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await menusTreeApi();
        setMenus(formatTreeList(response.data ?? []) as DataNode[]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    fetchData().then();
  }, [menusTreeApi]);

  return menus;
};

export default useMenusTree;
