import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { registerSchema } from "../schema/register-schem"
import toast from "react-hot-toast"
import { api } from "@/service/api"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"


export function useRegister() {
   const toastId = 'register-toast'
   const navigate = useNavigate()

   const { mutate, error } = useMutation({
      mutationKey: ["register-form"],
      mutationFn: async ({ email, password, confirmPassword }: z.infer<typeof registerSchema>) => {
         await submitRegister({
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
         console.log(err.message);
         toast.error(err.message, {
            id: toastId
         })
      },
      onSuccess: () => {
         toast.success("Registro realizado com sucesso!", {
            id: toastId
         })
         navigate("/")
      },
   })


   async function submitRegister(payload: z.infer<typeof registerSchema>) {
      try {
         const { data } = await api.post("/manager", payload)

         return data
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
         }
      }
   }

   return {
      handleRegister: mutate,
      error
   }
} 