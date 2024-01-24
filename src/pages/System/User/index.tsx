import { GridContent, PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import DepartmentsTree from './components/DepartmentsTree';
import UsersTable from './components/UsersTable';

const Users: React.FC = () => {
  const [departmentId, setDepartmentId] = useState<string>('');
  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={5}>
            <DepartmentsTree onChange={setDepartmentId} />
          </Col>
          <Col xs={24} sm={24} md={18} lg={19}>
            <UsersTable departmentId={departmentId} />
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};
export default Users;
