import request from 'utils/request';
const baseURL = window.apiConfig.server_url;

export function addNewDoctor(param) {
  return request({
    url: baseURL + '/api/Doctor/AddNewDoctor',
    method: 'post',
    data: param
  })
}
export function getArea(param) {
  return request({
    url: baseURL + '/api/SysParam/GetArea',
    method: 'get',
    params: param
  })
}
export function getSort(param) {
    return request({
      url: baseURL + '/api/SysParam/GetSort',
      method: 'get',
      params: param
    })
  }