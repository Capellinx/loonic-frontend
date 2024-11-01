import { loginSchema } from "@/components/forms/login-form/schema/login-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { useLogin } from "./hooks/use-login";


export function LoginForm() {
   const [showPassword, setShowPassword] = useState(false)

   const { handleLogin } = useLogin()

   const form = useForm<z.infer<typeof loginSchema>>({
      defaultValues: {
         email: '',
         password: ''
      },
      reValidateMode: "onChange",
      resolver: zodResolver(loginSchema)
   })

   function submit({ email, password }: z.infer<typeof loginSchema>) {
      handleLogin({
         email,
         password
      })
   }

   return (
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

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Senha</FormLabel>
                     <FormControl >
                        <div className="relative">
                           <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className={form.formState.errors.password ? "border-red-500 pl-10" : "pl-10"}
                           />
                           <LockIcon
                              className={form.formState.errors.password
                                 ?
                                 "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              }
                              size={18}
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className={form.formState.errors.password
                                 ? "absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
                                 : "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"}
                           >
                              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                           </button>
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">
               Entrar
            </Button>
         </form>
      </Form>
   )
}