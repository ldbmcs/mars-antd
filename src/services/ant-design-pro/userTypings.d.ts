import { PageResponse } from './models';

declare namespace API {
  type CreateOrUpdateUserParams = {
    username?: string;
    nickname?: string;
    mobile?: string;
    departmentId?: string;
    roleIds?: string;
  };

  type UserListItem = {
    id?: string;
    username?: string;
    nickname?: string;
    departmentId?: string;
    mobile?: string;
    roleIds?: string;
    enabled?: boolean;
    createdAt?: string;
  };

  type UserList = {
    data?: PageResponse<UserListItem>;
    code?: number;
  };
}
