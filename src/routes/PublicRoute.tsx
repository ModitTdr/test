import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { Navigate } from 'react-router';

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) return <Navigate to='/dashboard' />
  return <>{children}</>
}

export default PublicRoute