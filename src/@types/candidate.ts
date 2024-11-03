
export type Candidate = {
   id: number
   name: string
   avatar: string
   status: 'DISPONIVEL' | 'EM_PROCESSO' | 'INDISPONIVEL'
   skills: string[]
}

export type CandidateDetails = {
   id: number
   name: string
   email: string
   phone: string
   avatar: string
   status: 'DISPONIVEL' | 'EM_PROCESSO' | 'INDISPONIVEL'
   skills: string[]
   experience: string
   education: string
}