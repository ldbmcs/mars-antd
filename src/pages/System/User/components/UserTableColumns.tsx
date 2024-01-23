import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Switch } from 'antd';

interface RoleTableColumnsProps {
  handleEdit: (record: API.UserListItem) => void;
  handleDelete: (id: string) => void;
  handleStatusChange: (id: string, checked: boolean) => void;
}

export const UserTableColumns = ({
  handleEdit,
  handleDelete,
  handleStatusChange,
}: RoleTableColumnsProps): ProColumns<API.UserListItem>[] => [
  {
    title: '用户名',
    dataIndex: 'nickname',
    hideInSearch: false,
    tooltip: '账号登录名',
  },
  {
    title: '昵称',
    dataIndex: 'username',
    hideInSearch: false,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    hideInSearch: false,
  },
  {
    title: '部门',
    dataIndex: 'departmentName',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    hideInSearch: true,
    render: (item, props) => (
      <Switch
        checked={props.enabled}
        onChange={(checked) => {
          handleStatusChange(props.id!, checked);
        }}
      />
    ),
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
        title="是否要删除这个用户?"
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
