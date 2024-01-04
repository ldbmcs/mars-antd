import { request } from '@umijs/max';

export async function departmentsTree() {
  return request<API.UserList>('/api/departments/tree', {
    method: 'GET',
  });
}

export async function departments(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/departments', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
