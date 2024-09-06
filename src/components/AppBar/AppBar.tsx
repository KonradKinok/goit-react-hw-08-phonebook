import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav';
import { useAuthUser } from '../hooksUser';
import scss from './AppBar.module.scss';

export const AppBar: React.FC = () => {
    const { isLoggedIn } = useAuthUser();

    return (
        <header className={scss.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};