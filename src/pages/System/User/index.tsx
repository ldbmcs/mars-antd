import {GridContent, PageContainer} from "@ant-design/pro-components";
import React from "react";
import UsersTable from "./components/UsersTable";
import DepartmentsTree from "./components/DepartmentsTree";
import {Col, Row} from "antd";

const Users: React.FC = () => {
  return <PageContainer>
    <GridContent>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={12} lg={5}>
          <DepartmentsTree/>
        </Col>
        <Col xs={24} sm={24} md={18} lg={19}>
          <UsersTable/>
        </Col>
      </Row>
    </GridContent>
  </PageContainer>
}
export default Users;
