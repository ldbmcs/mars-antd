// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: string;
    username?: string;
    nickname?: string;
    mobile?: string;
    departmentId?: string;
  };

  type Token = {
    tokenName: string;
    tokenValue: string;
  };

  type LoginResult = {
    code?: number;
    msg?: string;
    data?: API.Token;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    principal?: string;
    credential?: string;
    autoLogin?: boolean;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type MenuListItem = {
    id?: string;
    name?: string;
    path?: string;
    icon?: string;
    index?: number;
    enabled?: number;
    createdAt?: string;
  };

  type MenuList = {
    data?: MenuListItem[];
    total?: number;
    success?: boolean;
  };

  type RoleListItem = {
    id?: string;
    name?: string;
    code?: string;
    enabled?: number;
    createdAt?: string;
  };

  type RoleList = {
    data?: RoleListItem[];
    total?: number;
    success?: boolean;
  };

  type UserListItem = {
    id?: string;
    username?: string;
    nickname?: string;
    enabled?: number;
    createdAt?: string;
  };

  type UserList = {
    data?: UserListItem[];
    total?: number;
    success?: boolean;
  };
}
