import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editCandidateSchema } from "../schema/edit-candidate-schema"
import { z } from "zod"
import { AxiosError } from "axios"
import { api } from "@/service/api"
import { useParams } from "react-router-dom"
import { useAuthContext } from "@/hooks/useContext"
import toast from "react-hot-toast"
import { useModal } from "@/hooks/useModal"

export function useEditCandidate() {
   const { id } = useParams()
   const { user } = useAuthContext()
   const { onClose } = useModal()
   
   const toastId = 'edit-candidate-toast'
   const queryClient = useQueryClient()

   const { mutate } = useMutation({
      mutationKey: ["edit-candidate"],
      mutationFn: async (payload: z.infer<typeof editCandidateSchema>) => {
         await submit(payload)
      },
      onMutate: () => {
         toast.loading("Editando candidato...", {
            id: toastId
         })
      },
      onError: (err: AxiosError) => {
         toast.error(err.message, {
            id: toastId
         })
      },
      onSuccess: () => {
         toast.success("Candidato editado com sucesso!", {
            id: toastId
         })
         if (id) {
            queryClient.invalidateQueries({ queryKey: ["candidate", id] })
            onClose()
         }
      },
   })

   async function submit(payload: z.infer<typeof editCandidateSchema>) {
      try {
         const { data } = await api.patch(`/candidate/${id}`, payload, {
            headers: {
               Authorization: `Bearer ${user?.access_token}`
            }
         })

         return data
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
         }
         throw new Error("Erro desconhecido ao editar o candidato")
      }
   }

   return {
      handleEditCandidate: mutate
   }
}
