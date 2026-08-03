'use client';

import { useCallback, useState } from 'react';
import { apiClient } from '@/lib/api';
import { useStore } from '@/lib/store';

/**
 * Хук для безопасной работы с сессией пользователя.
 * Скрывает детали работы с cookie-сессией от компонентов
 * и даёт единый интерфейс login/logout/refreshSession.
 */
export function useAuth() {
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.getCurrentUser();
      setUser(data.user ? { ...data.user, is_authenticated: true } : null);
      setError(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiClient.login(email, password);
        await refreshSession();
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка входа');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refreshSession]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, [setUser]);

  return {
    user,
    isAuthenticated: !!user?.is_authenticated,
    loading,
    error,
    login,
    logout,
    refreshSession,
  };
}