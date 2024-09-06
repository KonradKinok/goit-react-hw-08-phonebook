import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './AuthNav.module.scss';

export const AuthNav: React.FC = () => {
    const { nav, pLanguage, active } = scss;
    return (
        <div className={scss.nav}>
            <NavLink to="/register" className={({ isActive }) => isActive ? active : ""} >
                Register
            </NavLink>
            <NavLink  to="/login" className={({ isActive }) => isActive ? active : ""} >
                Log In
            </NavLink>
        </div>
    );
};