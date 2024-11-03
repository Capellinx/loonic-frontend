import { loginSchema } from "@/components/forms/login-form/schema/login-schema";
import { useAuthContext } from "@/hooks/useContext";
import { api } from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod"

export function useLogin() {
   const { saveInformationOnLocalStorage } = useAuthContext()
   
   const navigate = useNavigate()
   const toastId = 'register-toast'

   const { mutate } = useMutation({
      mutationKey: ["login-user"],
      mutationFn: async ({ email, password }: z.infer<typeof loginSchema>) => {
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
         navigate("/candidate-list")
      },
   })


   async function submitLogin({ email, password }: z.infer<typeof loginSchema>) {
      try {
         const { data } = await api.post("/manager/login", {
            email,
            password
         })

         saveInformationOnLocalStorage(data)

         return data
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
         }
         throw Error
      }
   }
   return {
      handleLogin: mutate
   }
}