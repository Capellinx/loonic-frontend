import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { MailIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgotPasswordSchema } from "./schema/form-password-form-schema"
import { useState } from "react"
import { useForgotPassword } from "./hooks/use-forgot-password"

export function ForgotPasswordForm() {
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const { handleForgotPassword } = useForgotPassword()

   const form = useForm<z.infer<typeof forgotPasswordSchema>>({
      defaultValues: {
         email: ""
      },
      reValidateMode: "onChange",
      resolver: zodResolver(forgotPasswordSchema)
   })

   async function submit({ email }: z.infer<typeof forgotPasswordSchema>) {
      setIsLoading(true)

      await new Promise(resolve => setTimeout(resolve, 500))

      setIsLoading(false)
      setIsSubmitted(true)
      
      handleForgotPassword({ email })
   }

   return (
      <>
         {!isSubmitted ? (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <div className="relative">
                                 <Input
                                    {...field}
                                    placeholder="example@mail.com"
                                    className={form.formState.errors.email ? "border-red-500 pl-10" : "pl-10"}
                                 />
                                 <MailIcon
                                    className={
                                       form.formState.errors.email
                                          ?
                                          "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" :
                                          "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    }
                                    size={18}
                                 />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                  </Button>
               </form>
            </Form>
         ) : (
            <div className="text-center space-y-4">
               <p className="text-green-600">
                  Se um usuário com esse e-mail existir, enviaremos instruções para redefinir sua senha.
               </p>
               <p>Verifique sua caixa de entrada e a pasta de spam.</p>
            </div>
         )}

      </>
   )
}