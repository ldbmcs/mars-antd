import useMenusTree from '@/hooks/useMenusTree';
import { listMenusUsingGet } from '@/services/ant-design-pro/sysMenuController';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form/lib';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.SysRoleVO>;

export type UpdateFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values?: Partial<API.SysRoleVO>;
};

const RoleFormModel: React.FC<UpdateFormProps> = ({
  title,
  open,
  onSubmit,
  values,
  onOpenChange,
}) => {
  const menus = useMenusTree(listMenusUsingGet);

  return (
    <ModalForm
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onSubmit}
      initialValues={values}
      width={'400px'}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入角色名称',
          },
        ]}
        width="md"
        name="name"
        label={'角色名称'}
      />
      <ProFormTreeSelect
        name="menuIds"
        label={'权限'}
        allowClear
        width="md"
        secondary
        request={async () => {
          return menus;
        }}
        rules={[
          {
            required: true,
            message: '请选择权限',
          },
        ]}
        fieldProps={{
          suffixIcon: null,
          filterTreeNode: true,
          showSearch: true,
          popupMatchSelectWidth: false,
          labelInValue: false,
          multiple: true,
          treeCheckable: true,
          autoClearSearchValue: true,
          treeNodeFilterProp: 'name',
          showCheckedStrategy: 'SHOW_ALL',
          fieldNames: {
            label: 'name',
            value: 'id',
          },
        }}
      />
    </ModalForm>
  );
};

export default RoleFormModel;
