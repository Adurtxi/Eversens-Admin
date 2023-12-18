// export const backendUrl = 'https://dev.api.eversens.alphapro.es/api/v1'
export const backendUrl = 'http://localhost:5274/api/v1'

const apiService = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
  params?: { [key: string]: string | number }
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (body && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(body)
  }

  if (params && method === 'GET') {
    const queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
    endpoint += `?${queryString}`
  }

  const response = await fetch(`${backendUrl}/${endpoint}`, config)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  } else {
    return response.text() as Promise<T>;
  }
}

export const getEntity = <T>(endpoint: string, params?: {[key: string]: string | number}) => apiService<T>(endpoint, 'GET', undefined, params)
export const postEntity = <T>(endpoint: string, data: any) => apiService<T>(endpoint, 'POST', data)
export const putEntity = <T>(endpoint: string, data: any) => apiService<T>(endpoint, 'PUT', data)
export const deleteEntity = <T>(endpoint: string) => apiService<T>(endpoint, 'DELETE')

export const toQueryString = (params: Record<string, any>) => {
  return '?' + Object.keys(params)
    .map(key => key + '=' + encodeURIComponent(params[key]))
    .join('&')
}

export default apiService
