import Auth from './Auth'
import config from '../../config'
import qs from 'query-string'
import request from 'axios'
import setCookieDomain from './setCookieDomain'
import { browserHistory } from 'react-router'

export default (params) => {
  const method = params.method

  const cookieDomain = setCookieDomain(document.location.hostname)
  const authAgent = new Auth(document, cookieDomain)

  const queryToken = authAgent.isLoggedIn() ? { access_token: authAgent.getToken() } : ''
  const query = params.query ? ('?' + qs.stringify(Object.assign(params.query, queryToken))) : ''
  const url = `${params.host || config.apiHost}${params.path}` + query
  const responseType = 'json'

  let headers = {
    'Content-Type': 'application/json'
    // 'Accept': `application/vnd.${config.apiName}.${config.apiVersion}+json`
  }

  if (params.auth) Object.assign(headers, params.auth)
  let requestParams = { method, url, responseType, headers }

  if (params.data) requestParams.data = params.data

  return request(requestParams).catch((res) => {
    if (res.status === 401) {
      authAgent.logout()
      browserHistory.push('/')
    }
  })
}
