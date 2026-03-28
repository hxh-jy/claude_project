import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setUser, clearUser, setLoading, setError } from '@/store/slices/authSlice'
import { authService, LoginPayload, RegisterPayload } from '@/services/authService'

/**
 * 管理用户认证相关的逻辑
 */
export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const error = useAppSelector((state) => state.auth.error)

  const login = useCallback(
    async (payload: LoginPayload) => {
      dispatch(setLoading(true))
      try {
        const user = await authService.login(payload)
        dispatch(setUser(user))
        return user
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        dispatch(setError(message))
        throw err
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch]
  )

  const register = useCallback(
    async (payload: RegisterPayload) => {
      dispatch(setLoading(true))
      try {
        const user = await authService.register(payload)
        dispatch(setUser(user))
        return user
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed'
        dispatch(setError(message))
        throw err
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch]
  )

  const logout = useCallback(() => {
    dispatch(clearUser())
  }, [dispatch])

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}
