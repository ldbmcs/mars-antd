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
export async function saveRoleUsingPost(body: API.RoleDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRoles DELETE /api/system/roles/${param0} */
export async function deleteRolesUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRolesUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateRole POST /api/system/roles/${param0} */
export async function updateRoleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleUsingPOSTParams,
  body: API.RoleDTO,
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

/** toggleRole POST /api/system/roles/${param0}/status */
export async function toggleRoleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toggleRoleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/roles/${param0}/status`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
