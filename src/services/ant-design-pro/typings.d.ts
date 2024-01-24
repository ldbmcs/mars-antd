declare namespace API {
  type ApiResultIPageSysRoleVO_ = {
    data?: IPageSysRoleVO_;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultIPageSysUserVO_ = {
    data?: IPageSysUserVO_;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultListSysDepartmentVO_ = {
    data?: SysDepartmentVO[];
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultListSysMenuVO_ = {
    data?: SysMenuVO[];
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultSaTokenInfo_ = {
    data?: SaTokenInfo;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultSysUser_ = {
    data?: SysUser;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type ApiResultVoid_ = {
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  };

  type deleteDepartmentsUsingDELETEParams = {
    /** ids */
    ids: string;
  };

  type deleteMenusUsingDELETEParams = {
    /** ids */
    ids: string;
  };

  type deleteRolesUsingDELETEParams = {
    /** ids */
    ids: string;
  };

  type deleteUsersUsingDELETEParams = {
    /** ids */
    ids: string;
  };

  type DepartmentDTO = {
    name: string;
    parentId?: string;
    sort?: number;
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

  type MenuDTO = {
    component?: string;
    icon?: string;
    name: string;
    parentId?: string;
    path?: string;
    permission?: string;
    sort?: number;
    type: number;
  };

  type RoleDTO = {
    menuIds?: string[];
    name: string;
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
    menuIdStr?: string;
    menuIds?: string[];
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

  type toggleDepartmentUsingPOSTParams = {
    /** enabled */
    enabled: boolean;
    /** id */
    id: string;
  };

  type toggleMenuUsingPOSTParams = {
    /** enabled */
    enabled: boolean;
    /** id */
    id: string;
  };

  type toggleRoleUsingPOSTParams = {
    /** enabled */
    enabled: boolean;
    /** id */
    id: string;
  };

  type toggleUserUsingPOSTParams = {
    /** enabled */
    enabled: boolean;
    /** id */
    id: string;
  };

  type updateDepartmentUsingPOSTParams = {
    /** id */
    id: string;
  };

  type updateMenuUsingPOSTParams = {
    /** id */
    id: string;
  };

  type updateRoleUsingPOSTParams = {
    /** id */
    id: string;
  };

  type updateUserUsingPOSTParams = {
    /** id */
    id: string;
  };

  type UserDTO = {
    departmentId: string;
    mobile: string;
    nickname: string;
    roleIds?: string[];
    username: string;
  };
}
