import { request } from '@umijs/max';

export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function user(
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
