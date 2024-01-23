import { request } from '@@/exports';

export async function menus(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request<API.MenuList>('/api/system/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function menusTree() {
  return request<API.MenuList>('/api/system/menus', {
    method: 'GET',
  });
}

export async function addMenu(
  body: API.CreateOrUpdateMenuParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateMenu(
  id: string,
  body: API.CreateOrUpdateMenuParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/menus/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeMenus(ids: string) {
  return request<Record<string, any>>('/api/system/menus/' + ids, {
    method: 'DELETE',
  });
}

export async function enableMenu(id: string | undefined) {
  return request<Record<string, any>>('/api/system/menus/' + id + '/enable', {
    method: 'POST',
  });
}

export async function disableMenu(id: string | undefined) {
  return request<Record<string, any>>('/api/system/menus/' + id + '/disable', {
    method: 'POST',
  });
}
