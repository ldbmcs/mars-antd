import { request } from '@umijs/max';

export async function roles(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request<API.RoleList>('/api/system/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addRole(
  body: API.CreateOrUpdateRoleParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateRole(
  id: string,
  body: API.CreateOrUpdateRoleParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/roles/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeRoles(ids: string) {
  return request<Record<string, any>>('/api/system/roles/' + ids, {
    method: 'DELETE',
  });
}

export async function enableRole(id: string | undefined) {
  return request<Record<string, any>>('/api/system/roles/' + id + '/enable', {
    method: 'POST',
  });
}

export async function disableRole(id: string | undefined) {
  return request<Record<string, any>>('/api/system/roles/' + id + '/disable', {
    method: 'POST',
  });
}
