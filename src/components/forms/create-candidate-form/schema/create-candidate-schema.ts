import { z } from "zod";

export const createCandidateSchema = z.object({
   name: z
      .string({ required_error: "Nome é obrigatório." })
      .min(1, "Nome é obrigatório."),
   email: z
      .string({ required_error: "E-mail é obrigatório." })
      .email({ message: "E-mail inválido." })
      .min(1, "E-mail é obrigatório."),
   phone: z
      .string({ required_error: "Telefone é obrigatório." })
      .min(1, "Telefone é obrigatório."),
   education: z
      .string({ required_error: "Formação é obrigatória." })
      .min(1, "Formação é obrigatória."),
   experience: z
      .string({ required_error: "Experiência é obrigatória." })
      .min(1, "Experiência é obrigatória."),
   status: z
      .enum(['DISPONIVEL', 'EM_PROCESSO', 'INDISPONIVEL'],{ required_error: "Status é obrigatório." }),
   skills: z
      .string({ required_error: "Habilidades são obrigatórias." })
      .min(1, "Habilidades são obrigatórias."),
})