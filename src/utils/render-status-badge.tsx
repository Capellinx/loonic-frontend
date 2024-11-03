import { Candidate } from "@/@types/candidate"
import { Badge } from "@/components/ui/badge"

export function renderStatusBadge(status: Candidate['status']) {
   const colorMap = {
      'DISPONIVEL': 'bg-green-500',
      'EM_PROCESSO': 'bg-yellow-500',
      'INDISPONIVEL': 'bg-blue-500'
   }
   return <Badge className= {`${colorMap[status]} text-white`}> { status } </Badge>
      
   }