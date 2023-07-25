import {addRule, menu, removeRule, updateRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import Icon from "@/components/UI/Icon";

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({...fields});
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
}

const Menu: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const intl = useIntl();

  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.system.menu.column.name"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: (
        <FormattedMessage
          id="pages.system.menu.column.icon"
          defaultMessage="Menu icon"
        />
      ),
      dataIndex: 'icon',
      hideInForm: true,
      hideInSearch: true,
      render: () => <Icon icon='SmileOutlined' />,
    },
    {
      title: (
        <FormattedMessage
          id="pages.system.menu.column.index"
          defaultMessage="Menu index"
        />
      ),
      dataIndex: 'index',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.system.menu.column.enabled" defaultMessage="Enabled"/>,
      dataIndex: 'enabled',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="Shut down"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running"/>
          ),
          status: 'Processing',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.system.menu.column.createdAt"
          defaultMessage="Created time"
        />
      ),
      sorter: true,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
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
          <FormattedMessage id="common.action.edit" defaultMessage="Edit"/>
        </a>,
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={handleSingleDelete}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <a>
            <FormattedMessage
              id="common.action.delete"
              defaultMessage="Delete"
            />
          </a>
        </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.MenuListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.system.menu.table.title',
          defaultMessage: 'Menu list',
        })}
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
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
          </Button>,
        ]}
        request={menu}
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
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
              <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
              </span>
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
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc"/>
      </ModalForm>
      <UpdateForm
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
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default Menu;
