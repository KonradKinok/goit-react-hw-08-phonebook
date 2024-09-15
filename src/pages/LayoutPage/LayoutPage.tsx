import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppBar } from "../../components/AppBar/AppBar";
import { Footer } from "../../components/Footer/Footer";
import { Loader } from "../../components/Loader/Loader";
import scss from "./LayoutPage.module.scss";

export const LayoutPage: React.FC = () => {
 return (
  <div className={scss["container-layoutpage"]}>
   <AppBar />
   <Suspense fallback={<Loader />}>
    <Outlet />
   </Suspense>
   <Footer />
   <Toaster position="top-right" reverseOrder={false} />
  </div>
 );
};
