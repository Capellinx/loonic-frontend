import CandidateDetailsPage from "@/app/candidate-details";
import CandidateListPage from "@/app/candidate-list";
import ForgotPasswordPage from "@/app/forgot-password";
import LoginPage from "@/app/login";
import Page404 from "@/app/page-404";
import RegisterPage from "@/app/register";
import { AuthControllerAccess } from "@/components/auth-controller-access/auth-controller-access";
import { Route, Routes } from "react-router-dom";

export const RoutesMain = () => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         
         // protected routes
         <Route element={<AuthControllerAccess/>}>
            <Route path="/candidate-list" element={<CandidateListPage />} />
            <Route path="/candidate-details/:id" element={<CandidateDetailsPage />} />
         </Route>
         
    
         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
         <Route path="*" element={<Page404 />} />
      </Routes>
   );
}
