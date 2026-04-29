import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<void, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/sign_in',
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
        register: builder.mutation<void, {email: string; password: string}>({
            query: (body) => ({
                url: '/auth/sign_up',
                method: 'POST',
                body,
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
    useRegisterMutation
} = userApi