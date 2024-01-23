import { useCrudOperations } from '@/hooks/useCrudOperations';
import { DeptTableColumns } from '@/pages/System/Dept/components/DeptTableColumns';
import {
  addDepartment,
  departments,
  disableDepartment,
  enableDepartment,
  removeDepartments,
  updateDepartment,
} from '@/services/ant-design-pro/department';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import SaveOrUpdateDepartment from './components/DepartmentFormModel';

const Dept: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DepartmentListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.DepartmentListItem[]>([]);

  const { handleAdd, handleUpdate, handleDelete, handleEnable, handleDisable } = useCrudOperations(
    addDepartment,
    updateDepartment,
    removeDepartments,
    enableDepartment,
    disableDepartment,
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
        columns={DeptTableColumns({
          handleEdit: (record: API.DepartmentListItem) => {
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
