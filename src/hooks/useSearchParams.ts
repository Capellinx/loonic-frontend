/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'query-string';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function useSearch() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const { pathname } = useLocation();

   function handleSearch(params: any, preserve = true) {

      if (preserve) {
         params = { ...getAllSearchParams(), ...params }
      }

      const query = qs.stringify(params, {
         skipNull: true,
         skipEmptyString: true,
         strict: true
      })

      navigate(`${pathname}?${query}`);
   }

   function getSearchParam(name: string) {

      return searchParams.get(name)
   }

   function getAllSearchParams() {
      return Object.fromEntries(searchParams.entries())
   }

   return { handleSearch, getSearchParam, getAllSearchParams }
}