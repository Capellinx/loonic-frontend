import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MailIcon, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
   const [email, setEmail] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [isSubmitted, setIsSubmitted] = useState(false)

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      await new Promise(resolve => setTimeout(resolve, 1500))

      setIsLoading(false)
      setIsSubmitted(true)
   }
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl font-bold text-center">Recuperar Senha</CardTitle>
            </CardHeader>
            <CardContent>
               {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                           <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10"
                           />
                           <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                     </div>
                     <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                     </Button>
                  </form>
               ) : (
                  <div className="text-center space-y-4">
                     <p className="text-green-600">
                        Se um usuário com esse e-mail existir, enviaremos instruções para redefinir sua senha.
                     </p>
                     <p>Verifique sua caixa de entrada e a pasta de spam.</p>
                  </div>
               )}
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