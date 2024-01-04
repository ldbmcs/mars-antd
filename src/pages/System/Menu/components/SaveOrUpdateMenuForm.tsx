import { menusTree } from '@/services/ant-design-pro/menu';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
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

const SaveOrUpdateUserForm: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const [menus, setMenus] = useState<DataNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await menusTree();
        setMenus(response.data as DataNode[]);
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
              message: '名称为必填项',
            },
          ]}
          width="md"
          name="name"
          label={'菜单名称'}
        />
        <ProFormTreeSelect
          name="parentId"
          label={'上级菜单'}
          allowClear
          width={330}
          secondary
          rules={[
            {
              required: true,
              message: '上级菜单为必填项',
            },
          ]}
          request={async () => {
            return menus;
          }}
          // tree-select args
          fieldProps={{
            suffixIcon: null,
            filterTreeNode: true,
            showSearch: true,
            popupMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
            },
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
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
      </ProForm.Group>
      <ProFormTextArea width="xl" name="remark" label={'备注'} />
    </ModalForm>
  );
};

export default SaveOrUpdateUserForm;
