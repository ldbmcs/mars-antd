// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listUsers GET /api/system/users */
export async function listUsersUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultIPageSysUserVO_>('/api/system/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** saveUser POST /api/system/users */
export async function saveUserUsingPost(body: API.UserDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUsers DELETE /api/system/users/${param0} */
export async function deleteUsersUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsersUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateUser POST /api/system/users/${param0} */
export async function updateUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserUsingPOSTParams,
  body: API.UserDTO,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** toggleUser POST /api/system/users/${param0}/status */
export async function toggleUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toggleUserUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}/status`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
