import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<void, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        getMe: builder.query<any, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

    }),
    overrideExisting: false,
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = userApi