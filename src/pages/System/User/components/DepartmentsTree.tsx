import { departmentsTree } from '@/services/ant-design-pro/department';
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
        const response = await departmentsTree();
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

  return (
    <Tree
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
