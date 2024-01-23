import { request } from '@umijs/max';

export async function users(
  params: { current?: number; pageSize?: number; departmentId: string },
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/system/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addUser(
  body: API.CreateOrUpdateUserParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateUser(
  id: string,
  body: API.CreateOrUpdateUserParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/users/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeUsers(ids: string) {
  return request<Record<string, any>>('/api/system/users/' + ids, {
    method: 'DELETE',
  });
}

export async function enableUser(id: string | undefined) {
  return request<Record<string, any>>('/api/system/users/' + id + '/enable', {
    method: 'POST',
  });
}

export async function disableUser(id: string | undefined) {
  return request<Record<string, any>>('/api/system/users/' + id + '/disable', {
    method: 'POST',
  });
}
