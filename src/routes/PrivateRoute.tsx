import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) return <Navigate to='/login' />
  return <>{children}</>
}

export default ProtectedRoute