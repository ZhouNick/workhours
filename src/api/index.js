import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

let api = axios.create({
  baseURL: 'http://117.48.208.154:8181/',
  adapter: jsonpAdapter,
  callbackParamName: 'callback'
})

export default {
  login: function (query) {
    return api.get('userapi/login', { params: query })
  },
  loadProjects: function () {
    return api.get('projectapi/list')
  },
  // 接口列表3
  workinghourapi: function (query) {
    return api.get('workinghourapi/list', { params: query })
  },
  // 接口列表4
  listByDate: function (query) {
    return api.get('workinghourapi/listByDate', {
      params: query
    })
  },
  // 接口列表6
  delWorkingHour: function (query) {
    return api.get('workinghourapi/delWorkingHour', {
      params: query
    })
  },
  // 接口7
  getProjectBySuperId: function (query) {
    return api.get('projectapi/getProjectBySuperId', { params: query })
  },
  // 接口列表8
  getWorkingHour: function (query) {
    return api.get('workinghourapi/getWorkingHourByProjectId', { params: query })
  }
}
