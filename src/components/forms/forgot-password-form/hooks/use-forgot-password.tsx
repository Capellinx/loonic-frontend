import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { forgotPasswordSchema } from "../schema/form-password-form-schema"
import { z } from "zod"

export function useForgotPassword(){
   const toastId = 'forgot-password-toast'

   const { mutate } = useMutation({
      mutationKey: ["forgot-password-user"],
      mutationFn: async ({ email }: z.infer<typeof forgotPasswordSchema>) => {
         await submitForgoPassword({
            email,
         })
      },
      onMutate: () => {
         toast.loading("Enviando e-mail...", {
            id: toastId
         })
      },
      onError: (err) => {
         toast.error(err.message, {
            id: toastId
         })
      },
      onSuccess: () => {
         toast.success("E-mail enviado com sucesso!", {
            id: toastId
         })
      },
   })

   async function submitForgoPassword({ email }: z.infer<typeof forgotPasswordSchema>) {
      console.log(email);
   }

   return {
      handleForgotPassword: mutate
   }
}

