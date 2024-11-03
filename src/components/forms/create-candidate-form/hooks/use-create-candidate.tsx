import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useAuthContext } from "@/hooks/useContext"
import { createCandidateSchema } from "../schema/create-candidate-schema"
import { z } from "zod"
import { api } from "@/service/api"
import { useModal } from "@/hooks/useModal"
import { AxiosError } from "axios"


export function useCreateCandidate() {
   const { onClose } = useModal()
   const { user } = useAuthContext()
   const toastId = 'create-candidate-toast'

   const { mutate, isSuccess } = useMutation({
      mutationKey: ["create-candidate"],
      mutationFn: async (data: z.infer<typeof createCandidateSchema>) => {
         await handleSubmit(data)
      },
      onMutate: () => {
         toast.loading("Cadastrando candidato...", {
            id: toastId
         })
      },
      onError: (err) => {
         console.log(err);
         toast.error(err.message, {
            id: toastId
         })
         return
      },
      onSuccess: () => {
         toast.success("Cadastro realizado com sucesso!", {
            id: toastId
         })
         onClose()
      },
   })

   async function handleSubmit(payload: z.infer<typeof createCandidateSchema>) {
      try {
         const { data } = await api.post("/candidate", payload, {
            headers: {
               Authorization: `Bearer ${user?.access_token}`
            }
         })

         return data
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
         }
      }
   }

   return {
      handleCreateCandidate: mutate,
      isSuccess
   }
}