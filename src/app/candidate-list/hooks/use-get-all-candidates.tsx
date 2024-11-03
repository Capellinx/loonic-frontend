import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCandidates() {

   const { data: candidates } = useQuery({
      queryKey: ['candidates'],
      queryFn: async () => {
         const { data } = await api.get('/candidate')
         return data
      },
      refetchOnWindowFocus: true,
      refetchInterval: 5 * 1000 // 5 segundos
   })

   return {
      candidates: candidates?.candidates,
      page: 1,
      total: candidates?.candidates.total
   }

}