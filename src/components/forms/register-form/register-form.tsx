import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { registerSchema } from "./schema/register-schem";
import { useRegister } from "./hooks/use-register-form";

export function RegisterForm() {
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setshowConfirmPassword] = useState(false)

   const { handleRegister } = useRegister()

   const form = useForm<z.infer<typeof registerSchema>>({
      defaultValues: {
         email: '',
         password: '',
         confirmPassword: ''
      },
      reValidateMode: "onChange",
      resolver: zodResolver(registerSchema)
   })

   function submit({email, password, confirmPassword}: z.infer<typeof registerSchema>) {
      handleRegister({
         email,
         password,
         confirmPassword
      });
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

            <FormField
               control={form.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Confirmar senha</FormLabel>
                     <FormControl >
                        <div className="relative">
                           <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
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
                              onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                              className={form.formState.errors.password
                                 ? "absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
                                 : "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"}
                           >
                              {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                           </button>
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="w-full">
               Registar
            </Button>
         </form>
      </Form>
   )
}