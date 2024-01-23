import { useCrudOperations } from '@/hooks/useCrudOperations';
import { DeptTableColumns } from '@/pages/System/Dept/components/DeptTableColumns';
import {
  deleteDepartmentUsingDelete,
  disableDepartmentUsingPost,
  enableDepartmentUsingPost,
  listDepartmentsUsingGet,
  saveDepartmentUsingPost,
  updateDepartmentUsingPost,
} from '@/services/ant-design-pro/sysDepartmentController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import DepartmentFormModel from './components/DepartmentFormModel';

const Dept: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysDepartmentVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysDepartmentVO[]>([]);

  const { handleAdd, handleUpdate, handleDelete, handleEnable, handleDisable } = useCrudOperations(
    saveDepartmentUsingPost,
    updateDepartmentUsingPost,
    deleteDepartmentUsingDelete,
    enableDepartmentUsingPost,
    disableDepartmentUsingPost,
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
      <ProTable<API.SysDepartmentVO>
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
        request={listDepartmentsUsingGet}
        columns={DeptTableColumns({
          handleEdit: (record: API.SysDepartmentVO) => {
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
      <DepartmentFormModel
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.AddDepartmentDTO);
          if (success) {
            handleCreateModalOpen(false);
            actionRef.current?.reload();
          }
        }}
      />
      <DepartmentFormModel
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(currentRow?.id, value as API.UpdateDepartmentDTO);
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
