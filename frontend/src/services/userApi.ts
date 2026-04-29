import { api } from './api'
import { setCredentials, logout } from '@/features/auth/authSlice'
export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<void, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/sign_in',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'], // ✅
        }),

        logout:  builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch }) {
                dispatch(logout())
                dispatch(api.util.resetApiState())
            },
        }),

        register: builder.mutation<void, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/sign_up',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'], // ✅
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