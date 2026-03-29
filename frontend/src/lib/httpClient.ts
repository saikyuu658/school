const BASE_URL = import.meta.env.VITE_API_URL
console.log("MInha meta: " + import.meta.env.VITE_API_URL)
type RequestOptions = RequestInit & {
  params?: Record<string, string>
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options

  const url = new URL(`${BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }

  const response = await fetch(url.toString(), {
    ...rest,
    //@ts-ignore
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...headers,
    },
  })

  if (response.status === 401) {
    const refreshed = await tryRefreshToken()
    if (!refreshed) {
      window.location.href = '/login'
      throw new Error('Sessão expirada')
    }

    return request<T>(endpoint, options)
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message ?? 'Request failed')
  }

  

  if (response.status === 204) return undefined as T

  return response.json()
}

function getAuthHeader() {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function tryRefreshToken(): Promise<boolean> {
  const refresh = localStorage.getItem('refresh_token')
  if (!refresh) return false

  const res = await fetch(`${BASE_URL}/auth/login/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  if (!res.ok) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return false
  }

  const { access } = await res.json()
  localStorage.setItem('access_token', access)
  return true
}

export const http = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}