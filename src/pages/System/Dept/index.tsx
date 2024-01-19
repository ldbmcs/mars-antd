import {
  addDepartment,
  departments,
  disableDepartment,
  enableDepartment,
  removeDepartments,
  updateDepartment,
} from '@/services/ant-design-pro/department';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/CreateOrUpdateDepartmentFormModel';
import SaveOrUpdateDepartment from './components/CreateOrUpdateDepartmentFormModel';

const handleAdd = async (fields: FormValueType) => {
  try {
    await addDepartment({ ...fields });
    message.success('添加成功');
    return true;
  } catch (error) {
    message.error('添加失败，请重试！');
    return false;
  }
};

const handleUpdate = async (id: string | undefined, fields: FormValueType) => {
  await updateDepartment(id!, { ...fields });
  message.success('操作成功');
  return true;
};

const handleDelete = async (selectedRows: API.DepartmentListItem[]) => {
  if (!selectedRows) return true;
  await removeDepartments(selectedRows.map((row) => row.id).join(','));
  message.success('操作成功');
  return true;
};

const handleSingleDelete = async (id: string | undefined, current: ActionType | undefined) => {
  await removeDepartments(id!);
  current?.reload();
  message.success('操作成功');
};

const Dept: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DepartmentListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.DepartmentListItem[]>([]);

  function handleStatusChange(id: string, check: boolean) {
    if (check) {
      enableDepartment(id).then(() => actionRef.current?.reload());
    } else {
      disableDepartment(id).then(() => actionRef.current?.reload());
    }
  }

  const columns: ProColumns<API.DepartmentListItem>[] = [
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
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          {'编辑'}
        </a>,
        <Popconfirm
          title="是否要删除这个部门?"
          onConfirm={() => handleSingleDelete(record.id, actionRef.current)}
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
      <ProTable<API.DepartmentListItem>
        headerTitle={'部门列表'}
        pagination={false}
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
        request={departments}
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
      <SaveOrUpdateDepartment
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalOpen(false);
            actionRef.current?.reload();
          }
        }}
      />
      <SaveOrUpdateDepartment
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(currentRow?.id, value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }
        }}
        values={currentRow}
      />
    </PageContainer>
  );
};

export default Dept;
