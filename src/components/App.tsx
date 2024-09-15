import React, { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LayoutPage } from "../pages/LayoutPage/LayoutPage";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "./redux/authUser/operationsUser.auth";
import { AppDispatch } from "./redux/store";
import { useAuthUser } from "./hooksUser";
import { Loader } from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));

export const App: React.FC = () => {
 const dispatch: AppDispatch = useDispatch();
 const { isRefreshing } = useAuthUser();

 useEffect(() => {
  dispatch(refreshUser());
 }, [dispatch]);

 return isRefreshing ? (
  <Loader />
 ) : (
  <Routes>
   <Route path="/" element={<LayoutPage />}>
    <Route index element={<HomePage />} />
    <Route
     path="/register"
     element={
      <RestrictedRoute redirectTo="/contacts" component={RegisterPage} />
     }
    />
    <Route
     path="/login"
     element={<RestrictedRoute redirectTo="/contacts" component={LoginPage} />}
    />
    <Route
     path="/contacts"
     element={<PrivateRoute redirectTo="/login" component={ContactsPage} />}
    />
   </Route>
  </Routes>
 );
};
