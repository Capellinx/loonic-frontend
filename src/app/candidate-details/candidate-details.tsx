import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Pencil } from 'lucide-react'
import { useCandidateDetail } from './hooks/use-candidate-detail'
import { EditCandidateModal } from '@/components/modals/edit-candidate-modal/edit-candidate-modal'
import { useModal } from '@/hooks/useModal'
import { ArrowLeft } from 'lucide-react';

export default function CandidateDetailsPage() {
   const { onOpen } = useModal()
   const { data } = useCandidateDetail()

   if (!data) {
      return <p>Carregando...</p>
   }

   return (
      <div className="min-h-screen bg-gray-100 py-8">
         <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-t-lg">
               <CardTitle className="text-2xl font-bold flex items-center justify-between">
                  Detalhes do Candidato
                  <div className="space-x-2">
                     <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="text-zinc-600 border-white hover:bg-white hover:text-blue-600">
                        <ArrowLeft /> Voltar
                     </Button>
                     <Button
                        onClick={() => onOpen()}
                        variant="outline"
                        className="text-zinc-600 border-white hover:bg-white hover:text-blue-600">
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                     </Button>
                  </div>
               </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                     <Avatar className="h-48 w-48 mx-auto">
                        <AvatarFallback>{data?.name[0]}</AvatarFallback>
                     </Avatar>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                     <div>
                        <Label htmlFor="name">Nome</Label>
                        <p className="text-lg font-semibold">{data?.name}</p>
                     </div>
                     <div>
                        <Label htmlFor="email">Email</Label>
                        <p>{data?.email}</p>
                     </div>
                     <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <p>{data?.phone}</p>
                     </div>
                     <div>
                        <Label htmlFor="skills">Habilidades</Label>
                        {data?.skills.map((skill: { name: string }, index: number) => (
                           <Badge key={index} className="mr-1 mb-1 ml-4">
                              {skill.name}
                           </Badge>
                        ))}
                     </div>
                     <div>
                        <Label htmlFor="experience">Experiência</Label>
                        <p>{data?.experience}</p>
                     </div>
                     <div>
                        <Label htmlFor="education">Educação</Label>
                        <p>{data?.education}</p>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
         <EditCandidateModal />
      </div>
   )
}
