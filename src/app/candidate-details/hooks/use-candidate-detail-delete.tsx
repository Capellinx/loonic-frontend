import { useAuthContext } from "@/hooks/useContext"
import { api } from "@/service/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"


export const useCandidateDetailDelete = () => {
   const { id } = useParams()
   const { user } = useAuthContext()

   const toastId = 'delete-candidate-toast'
   const navigate = useNavigate()

   const { mutate } = useMutation({
      mutationKey: ["delete-candidate"],
      mutationFn: async () => {
         await submitDeleteInformation(id as string)
      },
      onMutate() {
         toast.loading("Excluindo candidato...", {
            id: toastId
         })
      },
      onError: (err) => {
         if (err instanceof AxiosError) {
            toast.error(err.response?.data.error, {
               id: toastId
            })
         }
      },
      onSuccess: () => {
         toast.success("Candidato excluido com sucesso!", {
            id: toastId
         })
         navigate("/candidate-list")
      }
   })

   async function submitDeleteInformation(id: string) {
      try {
         await api.delete(`/candidate/${id}`, {
            headers: {
               Authorization: `Bearer ${user?.access_token}`
            }
         })

         return
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
         }
         throw Error
      }
   }

   return {
      handleDeleteCandidate: mutate
   }
}