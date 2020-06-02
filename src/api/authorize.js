import request from 'utils/request';
const baseURL = window.apiConfig.server_url;

export function bindInfo(param) {
  return request({
    url: baseURL + '/api/Authorize/BindInfo',
    method: 'post',
    data: param
  })
}
export function getUserInfo(param) {
  return request({
    url: baseURL + '/api/Authorize/GetUserInfo',
    method: 'get',
    params: param
  })
}
export function checkRewardCode(param) {
  return request({
    url: baseURL + '/api/Reward/CheckRewardCode',
    method: 'get',
    params: param
  })
}
export function getToken(param) {
  return request({
    url: baseURL + '/api/Authorize/GetToken',
    method: 'get',
    params: param
  })
}
