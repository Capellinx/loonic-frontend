import { useSearch } from "@/hooks/useSearchParams";
import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCandidates() {
   const { getAllSearchParams } = useSearch()

   const { page, skill, name } = getAllSearchParams();

   const { data: candidates } = useQuery({
      queryKey: ['candidates', page, skill, name],
      queryFn: async () => {
         const { data } = await api.get('/candidate', {
            params: {
               page,
               skill,
               name
            }
         })
         return data
      },
      refetchOnWindowFocus: true,
      refetchInterval: 5 * 1000 // 5 segundos
   })

   return {
      candidates: candidates?.candidates,
      page: candidates?.page,
      total: candidates?.total
   }

}