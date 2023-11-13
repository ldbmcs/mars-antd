import {addRule, removeRule, role, updateRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProFormText,
    ProFormTextArea, ProTable,
} from '@ant-design/pro-components';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from "./components/UpdateForm";

const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在保存');
    try {
        await addRule({...fields});
        hide();
        message.success('保存成功');
        return true;
    } catch (error) {
        hide();
        message.error('保存失败，请重试！');
        return false;
    }
};

const handleUpdate = async (fields: FormValueType) => {
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
}

const Role: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

    const columns: ProColumns<API.RoleListItem>[] = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: '禁用',
                    status: 'Default',
                },
                1: {
                    text: '启用',
                    status: 'Processing',
                },
            },
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
                    title="是否要删除这个角色?"
                    onConfirm={handleSingleDelete}
                    okText="确认"
                    cancelText="取消"
                    key="delete"
                >
                    <a>
                        {'删除'}
                    </a>
                </Popconfirm>
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.MenuListItem, API.PageParams>
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
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined/> {'新建'}
                    </Button>,
                ]}
                request={role}
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
                            <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>
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
            <ModalForm
                title={'新建角色'}
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
                            message: '角色名称为必填项',
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

export default Role;
