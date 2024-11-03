import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthContext } from '@/hooks/useContext'
import { Search, User2Icon, PlusIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { CreateCandidateModal } from '../../components/modals/create-candidate-modal/create-candidate-modal';
import { useModal } from '@/hooks/useModal'
import { CandidateList } from "@/app/candidate-list/fragaments/candidate-list"
import { useSearch } from "@/hooks/useSearchParams"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination"
import { useGetAllCandidates } from "./hooks/use-get-all-candidates"


export default function CandidateListPage() {
   const { onOpen } = useModal()
   const {page, total} = useGetAllCandidates()
   const { userLogoutAndDiscartInformation } = useAuthContext()
   const { handleSearch } = useSearch()

   return (
      <div className="min-h-screen bg-gray-100 py-8 p-3 md:p-0 md:pt-5">
         <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-t-lg">
               <CardTitle className="text-2xl font-bold flex items-center">
                  <User2Icon className="mr-2" />
                  Lista de Candidatos
               </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="flex items-center space-x-2 mb-6">
                  <Search className="text-gray-400" />
                  <Input
                     placeholder="Buscar por nome ou habilidade"
                     onChange={e => handleSearch(e.target.value)}
                     className="flex-grow"
                  />
                  <Button variant="outline" onClick={onOpen}>
                     <PlusIcon />
                  </Button>
                  <Button
                     onClick={() => userLogoutAndDiscartInformation()}
                     variant="secondary">
                     Sair
                  </Button>
               </div>
               <div className="space-y-4">
                  <CandidateList />
               </div>
               <div className="flex items-center justify-between mt-6">
                  {/* <div className="text-sm text-gray-500">
                     Mostrando {paginatedCandidates.length} de {filteredCandidates.length} candidatos
                  </div> */}
                  <div className="flex items-center space-x-2">
                     <Button
                        variant="outline"
                        size="icon"
                     // disabled={currentPage === 1}
                     >
                        <ChevronLeft className="h-4 w-4" />
                     </Button>
                     {/* <span className="text-sm font-medium">{currentPage} de {totalPages}</span> */}
                     <Button
                        variant="outline"
                        size="icon"
                     // disabled={currentPage === totalPages}
                     >
                        <ChevronRight className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
               <Pagination>
                  <PaginationContent>
                     <PaginationItem>
                        {parseInt(page) > 1 && (
                           <PaginationPrevious
                              onClick={() =>
                                 handleSearch({ page: page ? parseInt(page) - 1 : 1 })
                              }
                           />
                        )}
                     </PaginationItem>
                     <PaginationItem>
                        <PaginationLink>
                           {page ?? 1} / {total}
                        </PaginationLink>
                     </PaginationItem>

                     <PaginationItem>
                        {parseInt(page) < total && (
                           <PaginationNext
                              onClick={() =>
                                 handleSearch({ page: page ? parseInt(page) + 1 : 2 })
                              }
                           />
                        )}
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
               <CreateCandidateModal />
            </CardContent>
         </Card>
      </div>
   )
}