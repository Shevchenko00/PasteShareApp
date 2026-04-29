import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '@/features/auth/authSlice'
const API = 'http://localhost:2222'
const baseQuery = fetchBaseQuery({
    baseUrl: API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.accessToken
        if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
})

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'POST' },
            api,
            extraOptions
        )

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}