import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import React from 'react';

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

const CreateOrUpdateRoleFormModel: React.FC<UpdateFormProps> = ({
  title,
  open,
  onSubmit,
  values,
  onOpenChange,
}) => {
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

export default CreateOrUpdateRoleFormModel;
