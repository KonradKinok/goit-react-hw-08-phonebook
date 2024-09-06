import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthUser } from './hooksUser';
import { RouteProps } from './Interface/Interface';
/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute: React.FC<RouteProps> = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuthUser();
    return isLoggedIn ? <Navigate to={redirectTo} /> : <Component/>;
};
