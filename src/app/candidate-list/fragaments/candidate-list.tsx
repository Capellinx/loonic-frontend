import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { useGetAllCandidates } from "../hooks/use-get-all-candidates"
import { Candidate } from "@/@types/candidate";
import { Button } from "../../../components/ui/button";
import { renderStatusBadge } from "@/utils/render-status-badge";

export function CandidateList() {
   const { candidates } = useGetAllCandidates()

   return (
      <> 
         {candidates?.map((candidate: Candidate) => (
            <div>
               <Card key={candidate.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 flex flex-col gap-5 md:flex-row md:gap-0 items-center space-x-4">
                     <Avatar className="h-16 w-16">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-center md:text-left">{candidate.name}</h3>
                        <div className="flex items-center justify-center md:justify-normal space-x-2 my-5">
                           {renderStatusBadge(candidate.status)}
                        </div>
                        <div className="mt-2 flex">
                           {candidate.skills.map((skill, index) => (
                              <Badge key={index} className="mr-1 mb-1">
                                 {skill}
                              </Badge>
                           ))}
                        </div>
                     </div>
                     <Link to={`/candidate-details/${candidate.id}`}>
                        <Button variant="outline" className="ml-auto">Ver Perfil</Button>
                     </Link>
                  </CardContent>
               </Card>
            </div>
         ))}
      </>
   )
}