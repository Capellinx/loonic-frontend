import { api } from "@/service/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"


export function useCandidateDetail() {
   const { id } = useParams()

   const { data } = useQuery({
      queryKey: ['candidate'],
      queryFn: async () => {
         const { data } = await api.get(`/candidate/${id}`)
         return data
      },
      refetchOnWindowFocus: true,
      refetchInterval: 5000
   })

   return {
      data
   }
}