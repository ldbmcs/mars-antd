import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Switch } from 'antd';

interface DeptTableColumnsProps {
  handleEdit: (record: API.DepartmentListItem) => void;
  handleDelete: (id: string) => void;
  handleStatusChange: (id: string, checked: boolean) => void;
}

export const DeptTableColumns = ({
  handleEdit,
  handleDelete,
  handleStatusChange,
}: DeptTableColumnsProps): ProColumns<API.DepartmentListItem>[] => [
  {
    title: '部门名称',
    dataIndex: 'name',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    hideInSearch: true,
    render: (item, props) => {
      return (
        <Switch
          checked={props.enabled}
          onChange={(checked) => {
            handleStatusChange(props.id!, checked);
          }}
        />
      );
    },
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <a
        key="edit"
        onClick={() => {
          handleEdit(record);
        }}
      >
        {'编辑'}
      </a>,
      <Popconfirm
        title="是否要删除这个部门?"
        onConfirm={() => {
          handleDelete(record.id!);
        }}
        okText="确认"
        cancelText="取消"
        key="delete"
      >
        <a>{'删除'}</a>
      </Popconfirm>,
    ],
  },
];
