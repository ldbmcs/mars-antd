import { request } from '@umijs/max';

export async function departmentsTree() {
  return request<API.DepartmentList>('/api/system/departments', {
    method: 'GET',
  });
}

export async function departments(options?: { [key: string]: any }) {
  return request<API.DepartmentList>('/api/system/departments', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addDepartment(
  body: API.CreateOrUpdateDepartmentParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/departments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateDepartment(
  id: string,
  body: API.CreateOrUpdateDepartmentParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/system/departments/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeDepartments(ids: string) {
  return request<Record<string, any>>('/api/system/departments/' + ids, {
    method: 'DELETE',
  });
}

export async function enableDepartment(id: string | undefined) {
  return request<Record<string, any>>('/api/system/departments/' + id + '/enable', {
    method: 'POST',
  });
}

export async function disableDepartment(id: string | undefined) {
  return request<Record<string, any>>('/api/system/departments/' + id + '/disable', {
    method: 'POST',
  });
}
