import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authUser/operationsUser.auth';
import { useAuthUser } from '../hooksUser';
import scss from './UserMenu.module.scss';
import { AppDispatch } from "../redux/store";

export const UserMenu: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useAuthUser();

    return (
        <div className={scss.wrapper}>
            <p className={scss.username}>Welcome, {user.name}</p>
            <button type="button" onClick={() => dispatch(logOut())}>
                Logout
            </button>
        </div>
    );
};