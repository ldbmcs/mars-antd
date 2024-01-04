import SaveOrUpdateUserForm from '@/pages/System/Menu/components/CreateOrUpdateMenuFormModel';
import { FormValueType } from '@/pages/TableList/components/UpdateForm';
import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { menus } from '@/services/ant-design-pro/menu';
import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
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
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
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

const Menu: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<API.MenuListItem>[] = [
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
      title: '路由',
      dataIndex: 'path',
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
          title="是否要删除这个菜单?"
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
    <PageContainer>
      <ProTable<API.MenuListItem, API.PageParams>
        headerTitle={'菜单列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
        request={menus}
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
      <SaveOrUpdateUserForm
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
      <SaveOrUpdateUserForm
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
    </PageContainer>
  );
};

export default Menu;
