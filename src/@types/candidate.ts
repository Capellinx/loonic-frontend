
export type Candidate = {
   id: number
   name: string
   avatar: string
   status: 'DISPONIVEL' | 'EM_PROCESSO' | 'INDISPONIVEL'
   skills: string[]
}

export type CandidateDetails = {
   name: string
   email: string
   phone: string
   status: 'DISPONIVEL' | 'EM_PROCESSO' | 'INDISPONIVEL'
   skills: [
      {name: string}
   ]
   experience: string
   education: string
}