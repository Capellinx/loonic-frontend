import { Button } from "@/components/ui/button"
import { ArrowLeft, Lightbulb } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound404() {
   const navigate = useNavigate()
   
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
         <div className="text-center">
            <Lightbulb className="mx-auto h-24 w-24 text-yellow-400 mb-8" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Página não encontrada</h1>
            <p className="text-xl text-gray-600 mb-8">
               Parece que você se aventurou em um território inexplorado da TalentWise.
            </p>
            <p className="text-lg text-gray-500 mb-12">
               Não se preocupe, até os talentos mais brilhantes às vezes tomam caminhos inesperados.
            </p>
            <Button
               onClick={() => navigate('/')}
               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
               <ArrowLeft className="mr-2 h-5 w-5" />
               Voltar
            </Button>
         </div>
      </div>
   )
}