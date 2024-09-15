import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import scss from "./LoginPage.module.scss";

export default function LoginPage() {
 return (
  <HelmetProvider>
   <div className={scss["container-login-form"]}>
    <Helmet>
     <title>Login</title>
    </Helmet>
    <LoginForm />
   </div>
  </HelmetProvider>
 );
}
