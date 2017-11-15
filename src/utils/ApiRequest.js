class ApiRequest {

  constructor (token) {
    this.token = token
  }

  post (endpoint, params) {
    return fetch(endpoint, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(params)
    })
    .then(response => response.json())
  }

  get (endpoint, query) {
    const queryParams = this.createQueryParams(query)

    if (queryParams) {
      endpoint = endpoint + '?' + queryParams
    }

    return fetch(endpoint, {
      method: 'GET',
      headers: this.headers()
    })
    .then(response => response.json())
  }

  put (endpoint, params) {
    return fetch(endpoint, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify(params)
    })
    .then(response => response.json())
  }

  headers () {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (this.token) {
      headers.Authorization = 'Basic ' + this.token
    }

    return headers
  }

  createQueryParams (query) {
    if (!query || Object.keys(query).length < 1) {
      return
    }

    const esc = encodeURIComponent

    const queryParams = Object.keys(query)
      .map(k => esc(k) + '=' + esc(query[k]))
      .join('&')

    return queryParams
  }

}

export default ApiRequest
