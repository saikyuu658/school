import { http } from '../lib/httpClient'

export const authService = {
    login: (credentials: {
        email: string,
        password: string,
    }) =>
        http.post('/auth/login/', credentials).then((data: any) => data),

    getMe: () =>
        http.get('/auth/me/').then((data: any) => data),
}