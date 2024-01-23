declare namespace API {
  type CreateOrUpdateMenuParams = {
    name?: string;
    parentId?: string;
    sort?: number;
    type?: number;
    icon?: string;
    path?: string;
    component?: string;
    permission?: string;
  };

  type MenuListItem = {
    id?: string;
    key?: string;
    enabled?: boolean;
    name?: string;
    parentId?: string;
    sort?: number;
    type?: number;
    icon?: string;
    path?: string;
    component?: string;
    permission?: string;
    createdAt?: string;
    children?: MenuListItem[];
  };

  type MenuList = {
    data?: MenuListItem[];
  };
}
