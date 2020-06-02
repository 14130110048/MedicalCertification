import request from 'utils/request';
const baseURL = window.apiConfig.server_url;

export function getMyDoctor(param) {
  return request({
    url: baseURL + '/api/UserManage/GetMyDoctor',
    method: 'get',
    params: param
  })
}
export function getDoctors(param) {
  return request({
    url: baseURL + '/api/UserManage/GetDoctors',
    method: 'get',
    params: param
  })
}
export function getSalesmen(param) {
  return request({
    url: baseURL + '/api/UserManage/GetSalesmen',
    method: 'get',
    params: param
  })
}
export function getDoctorsByUserID(param) {
  return request({
    url: baseURL + '/api/UserManage/GetDoctorsByUserID',
    method: 'get',
    params: param
  })
}
