import { loginSchema } from "@/components/forms/login-form/schema/login-schema";
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { z } from "zod"

export function useLogin () {
   const toastId = 'register-toast'

   const {mutate} = useMutation({
      mutationKey: ["login-user"],
      mutationFn: async ({email, password}: z.infer<typeof loginSchema>) => {
         await submitLogin({
            email, 
            password
         })
      },
      onMutate: () => {
         toast.loading("Efetuando login...", {
            id: toastId
         })
      },
      onError: (err) => {
         toast.error(err.message, {
            id: toastId
         })
      },
      onSuccess: () => {
         toast.success("Login realizado com sucesso!", {
            id: toastId
         })
      },
   })


   async function submitLogin({email, password}: z.infer<typeof loginSchema>) {
      console.log({
         email,
         password
      });
   }
   return {
      handleLogin: mutate
   }
}