import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { registerSchema } from "../schema/register-schem"
import toast from "react-hot-toast"


export function useRegister() {
   const toastId = 'register-toast'

   const { mutate } = useMutation({
      mutationKey: ["register-form"],
      mutationFn: async ({ email, password, confirmPassword }: z.infer<typeof registerSchema>) => {
         submitRegister({
            email,
            password,
            confirmPassword
         })
      },
      onMutate: () => {
         toast.loading("Registrando usuário...", {
            id: toastId
         })
      },
      onError: (err) => {
         toast.error(err.message, {
            id: toastId
         })
      },
      onSuccess: () => {
         toast.success("Registro realizado com sucesso!", {
            id: toastId
         })
      },
   })


   function submitRegister(payload: z.infer<typeof registerSchema>) {
      const { email, password } = payload
      console.log({
         email,
         password
      });
   }

   return {
      handleRegister: mutate
   }
} 