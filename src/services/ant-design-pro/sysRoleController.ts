// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listRoles GET /api/system/roles */
export async function listRolesUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRolesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultIPageSysRoleVO_>('/api/system/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** saveRole POST /api/system/roles */
export async function saveRoleUsingPost(body: API.AddRoleDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRole POST /api/system/roles/${param0} */
export async function updateRoleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleUsingPOSTParams,
  body: API.UpdateRoleDTO,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** deleteRole DELETE /api/system/roles/${param0} */
export async function deleteRoleUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** disableRole POST /api/system/roles/${param0}/disable */
export async function disableRoleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableRoleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}/disable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** enableRole POST /api/system/roles/${param0}/enable */
export async function enableRoleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableRoleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}/enable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
