import { departmentsTree } from '@/services/ant-design-pro/department';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
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

const SaveOrUpdateUserDepartment: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const [departments, setDepartments] = useState<DataNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await departmentsTree();
        setDepartments(response.data as DataNode[]);
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
      width={'400px'}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入部门名称',
          },
        ]}
        width="md"
        name="title"
        label={'部门名称'}
      />
      <ProFormTreeSelect
        name="parentId"
        label={'上级部门'}
        allowClear
        width={330}
        secondary
        rules={[
          {
            required: true,
            message: '请选择上级部门',
          },
        ]}
        request={async () => {
          return departments;
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
          treeDefaultExpandAll: true,
          fieldNames: {
            label: 'name',
          },
        }}
      />
      <ProFormDigit
        fieldProps={{ precision: 0 }}
        rules={[
          {
            required: true,
            message: '请输入排序',
          },
        ]}
        width="md"
        name="sort"
        label={'排序'}
      />
    </ModalForm>
  );
};

export default SaveOrUpdateUserDepartment;
