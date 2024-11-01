import Page404 from "@/pages/page-404";
import { Route, Routes } from "react-router-dom";

export const RoutesMain = () => {
   return (
      <Routes>
         <Route path="*" element={<Page404 />} />
      </Routes>
   );
}
