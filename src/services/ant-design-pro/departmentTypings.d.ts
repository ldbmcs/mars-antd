declare namespace API {
  type CreateOrUpdateDepartmentParams = {
    name?: string;
    parentId?: string;
    sort?: number;
  };

  type DepartmentListItem = {
    id?: string;
    key?: string;
    name?: string;
    sort?: number;
    enabled?: boolean;
    createdAt?: string;
    children?: DepartmentListItem[];
  };

  type DepartmentList = {
    data?: DepartmentListItem[];
  };
}
