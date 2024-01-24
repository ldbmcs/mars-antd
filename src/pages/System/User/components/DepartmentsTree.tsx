import { listDepartmentsUsingGet } from '@/services/ant-design-pro/sysDepartmentController';
import { DownOutlined } from '@ant-design/icons';
import { Tree, TreeProps } from 'antd';
import { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';

interface DepartmentsTreeProps {
  onChange: (departmentId: string) => void;
}

const DepartmentsTree: React.FC<DepartmentsTreeProps> = ({ onChange }: DepartmentsTreeProps) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDepartmentsUsingGet();
        setTreeData(response.data as DataNode[]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };
    fetchData().then();
  }, []);

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    onChange(selectedKeys[0] as string);
  };

  const getAllNodeKeys = (treeData: DataNode[]): string[] => {
    const keys: string[] = [];
    treeData.forEach((node) => {
      // @ts-ignore
      keys.push(node.id as string);
      if (node.children) {
        keys.push(...getAllNodeKeys(node.children));
      }
    });
    return keys;
  };

  const allKeys = getAllNodeKeys(treeData);

  return (
    <Tree
      expandedKeys={allKeys}
      showLine
      switcherIcon={<DownOutlined />}
      onSelect={onSelect}
      treeData={treeData}
      fieldNames={{ key: 'id', title: 'name' }}
      style={{ marginLeft: '12px', marginRight: '12px', padding: '24px 12px' }}
    />
  );
};
export default DepartmentsTree;
