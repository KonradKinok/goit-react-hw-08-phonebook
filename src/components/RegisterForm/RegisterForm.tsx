import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authUser/operationsUser.auth';
import scss from './RegisterForm.module.scss';
import { AppDispatch } from "../redux/store";
export const RegisterForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
            email: HTMLInputElement;
      password: HTMLInputElement;
    };
        dispatch(
            register({
                name: formElements.name.value,
                email: formElements.email.value,
                password: formElements.password.value,
            })
        );
        form.reset();
    };

    return (
        <form className={scss.form} onSubmit={handleSubmit} autoComplete="off">
            <label className={scss.label}>
                Username
                <input type="text" name="name" />
            </label>
            <label className={scss.label}>
                Email
                <input type="email" name="email" />
            </label>
            <label className={scss.label}>
                Password
                <input type="password" name="password" />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};
