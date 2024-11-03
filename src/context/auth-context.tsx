import { ManagerInfoLogin } from "@/@types/manager";
import { createContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
   user: ManagerInfoLogin | null;
   setUser: (user: ManagerInfoLogin | null) => void;
   saveInformationOnLocalStorage: (data: ManagerInfoLogin) => void;
   userLogoutAndDiscartInformation: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [user, setUser] = useState<ManagerInfoLogin | null>(null);

   const navigate =useNavigate()

   useEffect(() => {
      const informationStoredUser = localStorage.getItem("@info_auth");

      if (informationStoredUser && !user) {
         setUser(JSON.parse(informationStoredUser));
         navigate("/candidate-list", { replace: true });
      }
   }, [user, navigate]);

   function saveInformationOnLocalStorage(data: ManagerInfoLogin) {
      localStorage.setItem("@info_auth", JSON.stringify(data));
      setUser(data);
   }

   function userLogoutAndDiscartInformation() {
      localStorage.removeItem("@info_auth");
      setUser(null);
   }

   return (
      <AuthContext.Provider
         value={{
            user,
            setUser,
            saveInformationOnLocalStorage,
            userLogoutAndDiscartInformation,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}


