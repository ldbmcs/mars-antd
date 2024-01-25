import useMenusTree from '@/hooks/useMenusTree';
import { listMenusUsingGet } from '@/services/ant-design-pro/sysMenuController';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form/lib';
import React, { useEffect } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.MenuDTO>;

export type UpdateFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values?: Partial<API.SysMenuVO>;
};

const MenuFormModel: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
}) => {
  const menus = useMenusTree(listMenusUsingGet);

  const [form] = ProForm.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  return (
    <ModalForm
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onSubmit}
      form={form}
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
          request={async () => {
            return menus;
          }}
          fieldProps={{
            suffixIcon: null,
            filterTreeNode: true,
            showSearch: true,
            popupMatchSelectWidth: false,
            labelInValue: false,
            autoClearSearchValue: true,
            treeNodeFilterProp: 'name',
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="path" label={'路由'} />
        <ProFormText width="md" name="component" label={'组件'} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit fieldProps={{ precision: 0 }} width="md" name="sort" label={'排序'} />
        <ProFormText
          width="md"
          name="permission"
          label={'权限'}
          rules={[
            {
              required: true,
              message: '请输入权限',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="type"
          label="类型"
          width={'md'}
          options={[
            { label: '目录', value: 0 },
            { label: '菜单', value: 1 },
            { label: '按钮', value: 2 },
          ]}
          rules={[{ required: true, message: '请选择类型' }]}
        />
        <ProFormText width="md" name="icon" label={'icon'} />
      </ProForm.Group>
    </ModalForm>
  );
};

export default MenuFormModel;
