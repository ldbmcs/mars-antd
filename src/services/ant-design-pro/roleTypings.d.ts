import { PageResponse } from './models';

declare namespace API {
  type CreateOrUpdateRoleParams = {
    name?: string;
    enabled?: boolean;
  };

  type RoleListItem = {
    id?: string;
    key?: string;
    name?: string;
    enabled?: boolean;
    createdAt?: string;
    children?: DepartmentListItem[];
  };

  type RoleList = {
    data?: PageResponse<RoleListItem>;
    code?: number;
  };
}
