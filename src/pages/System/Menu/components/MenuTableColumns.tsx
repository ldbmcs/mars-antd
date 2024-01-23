import { SmileOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Switch, Tag } from 'antd';

interface MenuTableColumnsProps {
  handleEdit: (record: API.MenuListItem) => void;
  handleDelete: (id: string) => void;
  handleStatusChange: (id: string, checked: boolean) => void;
}

const typeMap: Record<number, any> = {
  0: {
    color: 'blue',
    text: '目录',
  },
  1: {
    color: 'green',
    text: '菜单',
  },
  2: {
    color: 'volcano',
    text: '按钮',
  },
};

export const menuTableColumns = ({
  handleEdit,
  handleDelete,
  handleStatusChange,
}: MenuTableColumnsProps): ProColumns<API.MenuListItem>[] => [
  {
    title: '菜单名称',
    dataIndex: 'name',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    hideInForm: true,
    hideInSearch: true,
    render: () => <SmileOutlined />,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: '权限',
    dataIndex: 'permission',
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    width: 120,
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
    title: '类型',
    width: 120,
    dataIndex: 'type',
    render: (_, record) => (
      <Tag color={typeMap[record.type ?? 0].color}>{typeMap[record.type ?? 0].text}</Tag>
    ),
  },
  {
    title: '创建时间',
    sorter: true,
    width: 180,
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
        title="是否要删除这个菜单?"
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
