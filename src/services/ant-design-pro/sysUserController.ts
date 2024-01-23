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
export async function saveUserUsingPost(body: API.AddUserDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/system/users/${param0} */
export async function updateUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserUsingPOSTParams,
  body: API.UpdateUserDTO,
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

/** deleteUser DELETE /api/system/users/${param0} */
export async function deleteUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** disableUser POST /api/system/users/${param0}/disable */
export async function disableUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableUserUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}/disable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** enableUser POST /api/system/users/${param0}/enable */
export async function enableUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableUserUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/users/${param0}/enable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
