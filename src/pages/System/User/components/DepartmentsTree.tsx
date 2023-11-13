import React from "react";
import {Tree, TreeProps} from "antd";
import {DataNode} from "antd/es/tree";

const DepartmentsTree: React.FC = () => {
  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{title: <span style={{color: '#1677ff'}}>sss</span>, key: '0-0-1-0'}],
        },
      ],
    },
  ];
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  return <Tree
    // checkable
    defaultExpandedKeys={['0-0-0', '0-0-1']}
    defaultSelectedKeys={['0-0-0', '0-0-1']}
    defaultCheckedKeys={['0-0-0', '0-0-1']}
    onSelect={onSelect}
    // onCheck={onCheck}
    treeData={treeData}
    style={{marginLeft: '12px', marginRight: '12px', padding: '24px 12px'}}
  />
}
export default DepartmentsTree;
