import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

// const API = import.meta.env.VITE_API_URL
const API = 'http://localhost:2222'

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API,
    credentials: 'include',
    prepareHeaders: (headers) => {
        return headers
    },
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    let result = await rawBaseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {

        const refreshResult = await rawBaseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            },
            api,
            extraOptions
        )

        if (refreshResult.data) {
            result = await rawBaseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
            window.location.href = '/login'
        }
    }

    return result
}