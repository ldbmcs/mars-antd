import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea, StepsForm,
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Modal} from 'antd';
import React from 'react';
import PermissionSelector from './PermissionSelector';

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
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{padding: '32px 40px 48px'}}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '角色配置',
            })}
            open={props.updateModalOpen}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          desc: props.values.desc,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: '角色名称',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入角色名称！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
            defaultMessage: '角色描述',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
            defaultMessage: '请输入至少五个字符',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleDesc.descRules"
                  defaultMessage="请输入至少五个字符的角色描述！"
                />
              ),
              min: 5,
            },
          ]}
        />
        <ProFormDigit
          label="排序"
          name="sort"
          width="md"
          min={1}
          max={100}
          fieldProps={{precision: 0}}
        />
        <ProFormRadio.Group
          name="status"
          label="状态"
          options={[
            {
              label: '正常',
              value: 1,
            },
            {
              label: '停用',
              value: 0,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: '配置角色权限',
        })}
      >
        <PermissionSelector/>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
