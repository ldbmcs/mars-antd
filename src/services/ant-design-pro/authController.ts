// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** currentUser GET /api/auth/currentUser */
export async function currentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.ApiResultSysUserVO_>('/api/auth/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** logout POST /api/auth/logout */
export async function logoutUsingPost(options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** signIn POST /api/auth/signIn */
export async function signInUsingPost(body: API.SignInUserDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultSaTokenInfo_>('/api/auth/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** signUp POST /api/auth/signUp */
export async function signUpUsingPost(body: API.UserDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultVoid_>('/api/auth/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
