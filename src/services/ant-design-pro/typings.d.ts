declare namespace API {
  type AddDepartmentDTO = {
    name: string;
    parentId?: string;
    sort?: number;
  };

  type AddMenuDTO = {
    component?: string;
    icon?: string;
    name: string;
    parentId?: string;
    path?: string;
    permission?: string;
    sort?: number;
    type: number;
  };

  type AddRoleDTO = {
    menuIds?: string[];
    name: string;
  };

  type AddUserDTO = {
    departmentId: string;
    mobile: string;
    nickname: string;
    roleIds?: string[];
    username: string;
  };

  type ApiResultIPageSysRoleVO_ = {
    code?: number;
    data?: IPageSysRoleVO_;
    msg?: string;
  };

  type ApiResultIPageSysUserVO_ = {
    code?: number;
    data?: IPageSysUserVO_;
    msg?: string;
  };

  type ApiResultListSysDepartmentVO_ = {
    code?: number;
    data?: SysDepartmentVO[];
    msg?: string;
  };

  type ApiResultListSysMenuVO_ = {
    code?: number;
    data?: SysMenuVO[];
    msg?: string;
  };

  type ApiResultSaTokenInfo_ = {
    code?: number;
    data?: SaTokenInfo;
    msg?: string;
  };

  type ApiResultSysUser_ = {
    code?: number;
    data?: SysUser;
    msg?: string;
  };

  type ApiResultVoid_ = {
    code?: number;
    msg?: string;
  };

  type deleteDepartmentUsingDELETEParams = {
    /** ids */
    ids: string;
  };

  type deleteMenuUsingDELETEParams = {
    /** id */
    id: string;
  };

  type deleteRoleUsingDELETEParams = {
    /** id */
    id: string;
  };

  type deleteUserUsingDELETEParams = {
    /** id */
    id: string;
  };

  type disableDepartmentUsingPOSTParams = {
    /** id */
    id: string;
  };

  type disableMenuUsingPOSTParams = {
    /** id */
    id: string;
  };

  type disableRoleUsingPOSTParams = {
    /** id */
    id: string;
  };

  type disableUserUsingPOSTParams = {
    /** id */
    id: string;
  };

  type enableDepartmentUsingPOSTParams = {
    /** id */
    id: string;
  };

  type enableMenuUsingPOSTParams = {
    /** id */
    id: string;
  };

  type enableRoleUsingPOSTParams = {
    /** id */
    id: string;
  };

  type enableUserUsingPOSTParams = {
    /** id */
    id: string;
  };

  type IPageSysRoleVO_ = {
    current?: string;
    pages?: string;
    records?: SysRoleVO[];
    size?: string;
    total?: string;
  };

  type IPageSysUserVO_ = {
    current?: string;
    pages?: string;
    records?: SysUserVO[];
    size?: string;
    total?: string;
  };

  type listRolesUsingGETParams = {
    current?: number;
    pageSize?: number;
  };

  type listUsersUsingGETParams = {
    current?: number;
    pageSize?: number;
  };

  type SaTokenInfo = {
    isLogin?: boolean;
    loginDevice?: string;
    loginId?: Record<string, any>;
    loginType?: string;
    sessionTimeout?: string;
    tag?: string;
    tokenActiveTimeout?: string;
    tokenName?: string;
    tokenSessionTimeout?: string;
    tokenTimeout?: string;
    tokenValue?: string;
  };

  type SignInUserDTO = {
    credential: string;
    principal: string;
  };

  type SysDepartmentVO = {
    children?: SysDepartmentVO[];
    createdAt?: string;
    createdBy?: string;
    enabled?: boolean;
    id?: string;
    name?: string;
    parentId?: string;
    sort?: number;
  };

  type SysMenuVO = {
    children?: SysMenuVO[];
    component?: string;
    createdAt?: string;
    createdBy?: string;
    enabled?: boolean;
    icon?: string;
    id?: string;
    name?: string;
    parentId?: string;
    path?: string;
    permission?: string;
    sort?: number;
    type?: number;
  };

  type SysRoleVO = {
    createdAt?: string;
    createdBy?: string;
    enabled?: boolean;
    id?: string;
    menuIds?: string;
    name?: string;
  };

  type SysUser = {
    createdAt?: string;
    createdBy?: string;
    departmentId?: string;
    enabled?: boolean;
    id?: string;
    mobile?: string;
    nickname?: string;
    username?: string;
  };

  type SysUserVO = {
    createdAt?: string;
    createdBy?: string;
    departmentId?: string;
    departmentName?: string;
    enabled?: boolean;
    id?: string;
    mobile?: string;
    nickname?: string;
    roleIds?: string;
    username?: string;
  };

  type UpdateDepartmentDTO = {
    name: string;
    parentId?: string;
    sort?: number;
  };

  type updateDepartmentUsingPOSTParams = {
    /** id */
    id: string;
  };

  type UpdateMenuDTO = {
    component?: string;
    icon?: string;
    name: string;
    parentId?: string;
    path?: string;
    permission: string;
    sort?: number;
    type: number;
  };

  type updateMenuUsingPOSTParams = {
    /** id */
    id: string;
  };

  type UpdateRoleDTO = {
    menuIds?: string[];
    name: string;
  };

  type updateRoleUsingPOSTParams = {
    /** id */
    id: string;
  };

  type UpdateUserDTO = {
    departmentId: string;
    mobile: string;
    nickname: string;
    roleIds?: string[];
    username: string;
  };

  type updateUserUsingPOSTParams = {
    /** id */
    id: string;
  };
}
