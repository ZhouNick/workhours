import axios from 'axios'

let api = axios.create({
  baseURL: 'http://117.48.208.154:8181/'
})

export default {
  login: function (query) {
    return api.get('userapi/login', { params: query })
  },
  loadProjects: function () {
    return api.get('projectapi/list')
  },
  workinghourapi: function (query) {
    return api.get('workinghourapi/list', { params: query })
  }
}
