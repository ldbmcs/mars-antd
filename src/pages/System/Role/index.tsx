import { useCrudOperations } from '@/hooks/useCrudOperations';
import { RoleTableColumns } from '@/pages/System/Role/components/RoleTableColumns';
import {
  deleteRoleUsingDelete,
  disableRoleUsingPost,
  enableRoleUsingPost,
  listRolesUsingGet,
  saveRoleUsingPost,
  updateRoleUsingPost,
} from '@/services/ant-design-pro/sysRoleController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import RoleFormModel from './components/RoleFormModel';

const Role: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysRoleVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysRoleVO[]>([]);

  const { handleAdd, handleUpdate, handleDelete, handleEnable, handleDisable } = useCrudOperations(
    saveRoleUsingPost,
    updateRoleUsingPost,
    deleteRoleUsingDelete,
    enableRoleUsingPost,
    disableRoleUsingPost,
  );

  function handleStatusChange(id: string, check: boolean) {
    if (check) {
      handleEnable(id).then(() => actionRef.current?.reload());
    } else {
      handleDisable(id).then(() => actionRef.current?.reload());
    }
  }

  return (
    <PageContainer>
      <ProTable<API.SysRoleVO>
        headerTitle={'角色列表'}
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
        request={async (params: any) => {
          const dataArray = await listRolesUsingGet(params);
          return {
            data: dataArray.data?.records,
            success: true,
          };
        }}
        columns={RoleTableColumns({
          handleEdit: (record: API.SysRoleVO) => {
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
      <RoleFormModel
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.AddRoleDTO);
          if (success) {
            handleCreateModalOpen(false);
            actionRef.current?.reload();
          }
        }}
      />
      <RoleFormModel
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(currentRow?.id, value as API.UpdateRoleDTO);
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

export default Role;
