import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery.ts'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth, // 👈 ВАЖНО
    keepUnusedDataFor: 0,
    tagTypes: ['User'],
    endpoints: () => ({}),
})