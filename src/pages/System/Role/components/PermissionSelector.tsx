import { menusTree } from '@/services/ant-design-pro/menu';
import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';

const PermissionSelector = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  // const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [menus, setMenus] = useState<DataNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await menusTree();
        setMenus(response.data as DataNode[]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };
    fetchData().then();
  }, []);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = () => {};

  const onSelect = (selectedKeysValue: React.Key[]) => {
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      // checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={menus}
    />
  );
};

export default PermissionSelector;
