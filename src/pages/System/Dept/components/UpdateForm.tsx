import {ModalForm, ProForm, ProFormDateRangePicker, ProFormText,} from '@ant-design/pro-components';
import {Form} from 'antd';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      open={props.updateModalOpen}
      title="新建表单"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.onCancel();
        },
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await props.onSubmit(values);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="合同名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间"/>
      </ProForm.Group>
    </ModalForm>
  );
};

export default UpdateForm;
