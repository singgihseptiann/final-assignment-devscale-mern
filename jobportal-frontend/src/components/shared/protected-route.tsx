import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props extends React.PropsWithChildren {
  isAllowed?: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({ isAllowed = true, redirectPath = '/login', children }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
