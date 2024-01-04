import { departmentsTree } from '@/services/ant-design-pro/department';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form/lib';
import { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values?: Partial<API.RuleListItem>;
};

const CreateOrUpdateUserFormModel: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await departmentsTree();
        setTreeData(response.data as DataNode[]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };
    fetchData().then();
  }, []);
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
        <ProFormSelect
          name="positionId"
          label="职位"
          width={'md'}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
          ]}
          width="md"
          name="phone"
          label={'手机号'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="roleId"
          label="角色"
          width={'md'}
          rules={[{ required: true, message: '请选择角色' }]}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
        <ProFormTreeSelect
          name="departmentId"
          label={'部门'}
          allowClear
          width={330}
          secondary
          rules={[
            {
              required: true,
              message: '部门为必填项',
            },
          ]}
          request={async () => {
            return treeData;
          }}
          fieldProps={{
            suffixIcon: null,
            filterTreeNode: true,
            showSearch: true,
            popupMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,
            treeNodeFilterProp: 'name',
            fieldNames: {
              label: 'name',
            },
          }}
        />
      </ProForm.Group>
      <ProFormTextArea width="xl" name="remark" label={'备注'} />
    </ModalForm>
  );
};

export default CreateOrUpdateUserFormModel;
