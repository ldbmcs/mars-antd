// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listDepartments GET /api/system/departments */
export async function listDepartmentsUsingGet(options?: { [key: string]: any }) {
  return request<API.ApiResultListSysDepartmentVO_>('/api/system/departments', {
    method: 'GET',
    ...(options || {}),
  });
}

/** saveDepartment POST /api/system/departments */
export async function saveDepartmentUsingPost(
  body: API.AddDepartmentDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultVoid_>('/api/system/departments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDepartment DELETE /api/system/departments/${param0} */
export async function deleteDepartmentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDepartmentUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/departments/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateDepartment POST /api/system/departments/${param0} */
export async function updateDepartmentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDepartmentUsingPOSTParams,
  body: API.UpdateDepartmentDTO,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/departments/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** disableDepartment POST /api/system/departments/${param0}/disable */
export async function disableDepartmentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableDepartmentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/departments/${param0}/disable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** enableDepartment POST /api/system/departments/${param0}/enable */
export async function enableDepartmentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableDepartmentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/departments/${param0}/enable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
