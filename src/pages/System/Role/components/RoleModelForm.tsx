import PermissionSelector from '@/pages/System/Role/components/PermissionSelector';
import { ModalForm } from '@ant-design/pro-components';
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

const SaveOrUpdateUserForm: React.FC<UpdateFormProps> = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  values,
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
      <PermissionSelector />
    </ModalForm>
  );
};

export default SaveOrUpdateUserForm;
