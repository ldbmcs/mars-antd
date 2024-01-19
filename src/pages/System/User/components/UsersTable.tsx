import CreateOrUpdateUserFormModel from '@/pages/System/User/components/CreateOrUpdateUserFormModel';
import { addRule, removeRule, updateRule, user } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在保存');
  try {
    await addRule({ ...fields });
    hide();
    message.success('保存成功');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败，请重试！');
    return false;
  }
};

const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在保存');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('保存成功');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败，请重试！');
    return false;
  }
};

const handleDelete = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

const handleSingleDelete = async (e?: React.MouseEvent<HTMLElement>) => {
  const hide = message.loading('正在删除');
  try {
    await removeRule({
      key: e?.currentTarget.getAttribute('key'),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
  }
};

interface UsersTableProps {
  departmentId: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ departmentId }: UsersTableProps) => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<API.UserListItem>[] = [
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
      dataIndex: 'phone',
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
      valueType: 'switch',
      hideInSearch: true,
      render: (item, props) => <Switch checked={props.enabled === 1} />,
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
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          {'编辑'}
        </a>,
        <Popconfirm
          title="是否要删除这个用户?"
          onConfirm={handleSingleDelete}
          okText="确认"
          cancelText="取消"
          key="delete"
        >
          <a>{'删除'}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.UserListItem, API.PageParams & { departmentId: string }>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalOpen(true);
            }}
          >
            <PlusOutlined /> {'新建'}
          </Button>,
        ]}
        request={user}
        params={{ departmentId }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              {'已选择 '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              {' 项'}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleDelete(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {'批量删除'}
          </Button>
        </FooterToolbar>
      )}
      <CreateOrUpdateUserFormModel
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleCreateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <CreateOrUpdateUserFormModel
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        values={currentRow}
      />
    </>
  );
};

export default UsersTable;
