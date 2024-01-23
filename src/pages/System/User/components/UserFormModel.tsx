import useDepartmentsTree from '@/hooks/useDepartmentsTree';
import { departmentsTree } from '@/services/ant-design-pro/department';
import { roles } from '@/services/ant-design-pro/roles';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form/lib';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UserListItem>;

export type UpdateFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values?: Partial<API.UserListItem>;
};

const UserFormModel: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const departments = useDepartmentsTree(departmentsTree);

  const requestRoles = async () => {
    const response = await roles({ page: 1, pageSize: 1000 });
    return response.data.records.map((item) => {
      return { label: item.name, value: item.id };
    });
  };

  return (
    <ModalForm
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onSubmit}
      initialValues={values}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '昵称为必填项',
            },
          ]}
          width="md"
          name="nickname"
          label={'昵称'}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '用户名为必填项',
            },
          ]}
          width="md"
          name="username"
          label={'用户名'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
          ]}
          width="md"
          name="mobile"
          label={'手机号'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="roleIds"
          label="角色"
          width={'md'}
          rules={[{ required: true, message: '请选择角色' }]}
          request={requestRoles}
          fieldProps={{
            mode: 'multiple',
            labelInValue: false,
          }}
        />
        <ProFormTreeSelect
          name="departmentId"
          label={'部门'}
          allowClear
          width={330}
          secondary
          request={async () => {
            return departments;
          }}
          fieldProps={{
            suffixIcon: null,
            filterTreeNode: true,
            showSearch: true,
            popupMatchSelectWidth: false,
            labelInValue: false,
            autoClearSearchValue: true,
            treeNodeFilterProp: 'name',
            treeDefaultExpandAll: true,
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default UserFormModel;
