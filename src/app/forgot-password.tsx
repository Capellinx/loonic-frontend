import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ForgotPasswordForm } from '@/components/forms/forgot-password-form/forgot-password-form'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {


   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl font-bold text-center">Recuperar Senha</CardTitle>
            </CardHeader>
            <CardContent>
               <ForgotPasswordForm />
            </CardContent>
            <CardFooter className="flex justify-center">
               <a href="/login" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o login
               </a>
            </CardFooter>
         </Card>
      </div>
   )
}