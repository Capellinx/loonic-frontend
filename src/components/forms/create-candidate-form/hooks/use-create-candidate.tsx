import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useAuthContext } from "@/hooks/useContext"
import { createCandidateSchema } from "../schema/create-candidate-schema"
import { z } from "zod"
import { api } from "@/service/api"
import { useModal } from "@/hooks/useModal"


export function useCreateCandidate() {
   const { onClose } = useModal()
   const { user } = useAuthContext()
   const toastId = 'create-candidate-toast'

   const { mutate } = useMutation({
      mutationKey: ["create-candidate"],
      mutationFn: async (data: z.infer<typeof createCandidateSchema>) => {
         await handleSubmit(data)
      },
      onSuccess: () => {
         toast.success("Cadastro realizado com sucesso!", {
            id: toastId
         })
      },
      onError: (err) => {
         console.log(err);
         toast.error("Erro ao realizar o cadastro!", {
            id: toastId
         })
      },
      onMutate: () => {
         onClose()
         toast.loading("Cadastrando candidato...", {
            id: toastId
         })
      }
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
         if (error instanceof Error) {
            throw new Error(error.message)
         }
         throw Error
      }
   }

   return {
      handleCreateCandidate: mutate
   }
}