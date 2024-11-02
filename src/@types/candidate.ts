
export type Candidate = {
   id: number
   name: string
   avatar: string
   status: 'Disponível' | 'Em processo' | 'Contratado'
   skills: string[]
}

export type CandidateDetails = {
   id: number
   name: string
   email: string
   phone: string
   avatar: string
   status: 'Disponível' | 'Em processo' | 'Contratado'
   skills: string[]
   experience: string
   education: string
}