import { RegisterForm } from "@/components/forms/register-form/register-form";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle
} from "@/components/ui/card"

export default function RegisterPage() {
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 md:p-0">
       <Card className="w-full max-w-md">
          <CardHeader>
             <CardTitle className="text-2xl font-bold text-center">Bem-vindo ao TalentWise</CardTitle>
             <CardDescription className='text-center'>Preencha com seus dados para se registrar!</CardDescription>
          </CardHeader>
          <CardContent>
             <RegisterForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
             <p>
                Já possui conta? <a
                   href="/"
                   className="text-sm text-blue-600 hover:underline"
                >Faça login</a>
             </p>
          </CardFooter>
       </Card>
    </div>
 );
}