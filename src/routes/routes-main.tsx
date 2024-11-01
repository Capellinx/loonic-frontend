import ForgotPasswordPage from "@/app/forgot-password";
import LoginPage from "@/app/login/login";
import Page404 from "@/app/page-404";
import { Route, Routes } from "react-router-dom";

export const RoutesMain = () => {
   return (
      <Routes>
         <Route path="*" element={<Page404 />} />
      </Routes>
   );
}
