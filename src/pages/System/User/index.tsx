import {ProCard} from "@ant-design/pro-components";
import React from "react";
import UsersTable from "@/pages/System/User/components/UsersTable";
import DepartmentsTree from "@/pages/System/User/components/DepartmentsTree";

const Users: React.FC = () => {
  return <ProCard split="vertical">
    <ProCard title="部门列表" colSpan="30%">
      <DepartmentsTree />
    </ProCard>
    <ProCard title="用户列表">
      <UsersTable />
    </ProCard>
  </ProCard>;
}
export default Users;
