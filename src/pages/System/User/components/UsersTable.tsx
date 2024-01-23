import { useCrudOperations } from '@/hooks/useCrudOperations';
import UserFormModel from '@/pages/System/User/components/UserFormModel';
import { UserTableColumns } from '@/pages/System/User/components/UserTableColumns';
import {
  deleteUserUsingDelete,
  disableUserUsingPost,
  enableUserUsingPost,
  listUsersUsingGet,
  saveUserUsingPost,
  updateUserUsingPost,
} from '@/services/ant-design-pro/sysUserController';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';

interface UsersTableProps {
  departmentId: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ departmentId }: UsersTableProps) => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysUserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysUserVO[]>([]);

  const { handleAdd, handleUpdate, handleDelete, handleEnable, handleDisable } = useCrudOperations(
    saveUserUsingPost,
    updateUserUsingPost,
    deleteUserUsingDelete,
    enableUserUsingPost,
    disableUserUsingPost,
  );

  function handleStatusChange(id: string, check: boolean) {
    if (check) {
      handleEnable(id).then(() => actionRef.current?.reload());
    } else {
      handleDisable(id).then(() => actionRef.current?.reload());
    }
  }

  return (
    <>
      <ProTable<API.SysUserVO>
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
        request={async (params: API.listUsersUsingGETParams) => {
          const dataArray = await listUsersUsingGet(params);
          return {
            data: dataArray.data?.records ?? [],
            success: true,
          };
        }}
        params={{ departmentId }}
        columns={UserTableColumns({
          handleEdit: (record: API.SysUserVO) => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          },
          handleDelete: async (id: string) => {
            const success = await handleDelete(id!);
            if (success) {
              actionRef.current?.reload();
            }
          },
          handleStatusChange,
        })}
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
              await handleDelete(selectedRowsState.map((row) => row.id).join(','));
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {'批量删除'}
          </Button>
        </FooterToolbar>
      )}
      <UserFormModel
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.AddUserDTO);
          if (success) {
            handleCreateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <UserFormModel
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(currentRow?.id, value as API.UpdateUserDTO);
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
