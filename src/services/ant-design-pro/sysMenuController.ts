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
export async function saveMenuUsingPost(body: API.AddMenuDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/system/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMenu POST /api/system/menus/${param0} */
export async function updateMenuUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMenuUsingPOSTParams,
  body: API.UpdateMenuDTO,
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

/** deleteMenu DELETE /api/system/menus/${param0} */
export async function deleteMenuUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** disableMenu POST /api/system/menus/${param0}/disable */
export async function disableMenuUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableMenuUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}/disable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** enableMenu POST /api/system/menus/${param0}/enable */
export async function enableMenuUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableMenuUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResultVoid_>(`/api/system/menus/${param0}/enable`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
