import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API = import.meta.env.VITE_API_URL


const baseQuery = fetchBaseQuery({
    baseUrl: API,
    credentials: 'include',
    prepareHeaders: (headers, {  }) => {
        // const token = (getState() as any).auth.accessToken
        // if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
})
export { baseQuery };