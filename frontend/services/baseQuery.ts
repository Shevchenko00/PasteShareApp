import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.accessToken
        if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
})
export { baseQuery };