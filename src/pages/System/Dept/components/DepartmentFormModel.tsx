import { listDepartmentsUsingGet } from '@/services/ant-design-pro/sysDepartmentController';
import { ModalForm, ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form/lib';
import { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.SysDepartmentVO>;

export type UpdateFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values?: Partial<API.SysDepartmentVO>;
};

const SaveOrUpdateUserDepartment: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const [departments, setDepartments] = useState<DataNode[]>([]);

  const [form] = ProForm.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  function formatTreeList(list: API.SysDepartmentVO[]) {
    list.map((item) => {
      if (item['children']) {
        item.children = formatTreeList(item.children);
      }
      return item;
    });
    return list;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDepartmentsUsingGet();
        setDepartments(formatTreeList(response.data ?? []) as DataNode[]);
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
      form={form}
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
        name="name"
        label={'部门名称'}
      />
      <ProFormTreeSelect
        name="parentId"
        label={'上级部门'}
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
      <ProFormDigit fieldProps={{ precision: 0 }} width="md" name="sort" label={'排序'} />
    </ModalForm>
  );
};

export default SaveOrUpdateUserDepartment;
