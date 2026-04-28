import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
    const { isAuth, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return children
}