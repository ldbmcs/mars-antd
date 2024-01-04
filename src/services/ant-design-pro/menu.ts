import { request } from '@@/exports';

export async function menus(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request<API.MenuList>('/api/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function menusTree() {
  return request<API.UserList>('/api/menus/tree', {
    method: 'GET',
  });
}
