import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthUser } from './hooksUser/useAuthUser';
import { RouteProps } from './Interface/Interface';
/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */

export const PrivateRoute: React.FC<RouteProps> = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn, isRefreshing, user } = useAuthUser();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    console.log("PrivateRoute -> useAuthUser", "isLoggedIn:", isLoggedIn, "isRefreshing:", isRefreshing, "user:", user,)
    return shouldRedirect ? <Navigate to={redirectTo} /> :<Component/>;
};