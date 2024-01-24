import { useCrudOperations } from '@/hooks/useCrudOperations';
import MenuFormModel from '@/pages/System/Menu/components/MenuFormModel';
import { menuTableColumns } from '@/pages/System/Menu/components/MenuTableColumns';
import {
  deleteMenusUsingDelete,
  listMenusUsingGet,
  saveMenuUsingPost,
  toggleMenuUsingPost,
  updateMenuUsingPost,
} from '@/services/ant-design-pro/sysMenuController';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';

const Menu: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysMenuVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysMenuVO[]>([]);

  const { handleAdd, handleUpdate, handleDelete, handleToggle } = useCrudOperations(
    saveMenuUsingPost,
    updateMenuUsingPost,
    deleteMenusUsingDelete,
    toggleMenuUsingPost,
  );

  return (
    <PageContainer>
      <ProTable<API.SysMenuVO>
        headerTitle={'菜单列表'}
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
        request={listMenusUsingGet}
        columns={menuTableColumns({
          handleEdit: (record: API.SysMenuVO) => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          },
          handleDelete: async (id: string) => {
            const success = await handleDelete({ ids: id! });
            if (success) {
              actionRef.current?.reload();
            }
          },
          handleStatusChange: (id: string, checked: boolean) => {
            handleToggle({ id, enabled: checked }).then(() => actionRef.current?.reload());
          },
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
              await handleDelete({ ids: selectedRowsState.map((row) => row.id).join(',') });
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {'批量删除'}
          </Button>
        </FooterToolbar>
      )}
      <MenuFormModel
        title={'新建'}
        open={createModalOpen}
        onOpenChange={handleCreateModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.MenuDTO);
          if (success) {
            handleCreateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <MenuFormModel
        title={'编辑'}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate({ id: currentRow?.id }, value as API.MenuDTO);
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
