import { useAuthContext } from "@/hooks/useContext"
import { Navigate, Outlet } from "react-router-dom";

export function AuthControllerAccess() {
   const { user } = useAuthContext()

   if(!user?.access_token) {
      return <Navigate to="/" />;
   }   

   return <Outlet />;
}
