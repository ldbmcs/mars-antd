// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listMenus GET /api/system/menus */
export async function listMenusUsingGet(options?: { [key: string]: any }) {
  return request<API.ApiResultListSysMenuVO_>('/api/system/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** saveMenu POST /api/system/menus */
export async function saveMenuUsingPost(body: API.MenuDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMenus DELETE /api/system/menus/${param0} */
export async function deleteMenusUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenusUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateMenu POST /api/system/menus/${param0} */
export async function updateMenuUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMenuUsingPOSTParams,
  body: API.MenuDTO,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** toggleMenu POST /api/system/menus/${param0}/status */
export async function toggleMenuUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toggleMenuUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}/status`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
