import request from 'utils/request';
const baseURL = window.apiConfig.server_url;

export function getTrainList(param) {
  return request({
    url: baseURL + '/api/Train/GetTrainList',
    method: 'get',
    params: param
  })
}
export function getTrainContent(param) {
  return request({
    url: baseURL + '/api/Train/GetTrainContent',
    method: 'get',
    params: param
  })
}
export function getExam(param) {
  return request({
    url: baseURL + '/api/Train/GetExam',
    method: 'get',
    params: param
  })
}
export function submitExam(param) {
  return request({
    url: baseURL + '/api/Train/SubmitExam',
    method: 'post',
    data: param
  })
}