import { request } from '@umijs/max';
export async function departmentsTree() {
  return request<API.UserList>('/api/departments/tree', {
    method: 'GET',
  });
}
