// hooks/useAuth.ts
import {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} from '@/services/userApi'

export const useAuth = () => {
    const [loginMutation, loginState] = useLoginMutation()
    const [logoutMutation] = useLogoutMutation()
    const meQuery = useGetMeQuery()

    const login = async (email: string, password: string) => {
        await loginMutation({ email, password }).unwrap()
    }

    const logout = async () => {
        await logoutMutation().unwrap()
    }

    return {
        user: meQuery.data,
        isAuth: !!meQuery.data,
        isLoading: meQuery.isLoading,

        login,
        logout,

        loginLoading: loginState.isLoading,
        loginError: loginState.error,
    }
}