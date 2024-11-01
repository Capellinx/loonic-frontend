import { LoginForm } from "@/components/forms/login-form/login-form"
import { 
   Card, 
   CardContent, 
   CardDescription,
   CardFooter, 
   CardHeader, 
   CardTitle 
} from "@/components/ui/card"


export default function LoginPage() {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 md:p-0">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl font-bold text-center">Bem-vindo ao TalentWise</CardTitle>
               <CardDescription className='text-center'>Use o acesso que foi fornecido na documentação</CardDescription>
            </CardHeader>
            <CardContent>
               <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
               <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Esqueceu sua senha?</a>
            </CardFooter>
         </Card>
      </div>
   )
}