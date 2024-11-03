import { z } from "zod"

export const editCandidateSchema = z.object({
   name: z
      .string({ required_error: "Nome não pode estar vazio." })
      .min(1, "Nome não pode estar vazio.")
      .optional(),
   email: z
      .string({ required_error: "E-mail não pode estar vazio." })
      .email({ message: "E-mail inválido." })
      .min(1, "E-mail não pode estar vazio.")
      .optional(),
   status: z
      .string({ required_error: "Status é obrigatório." })
      .min(1, "Status é obrigatório.")
      .optional(),
   skills: z.array(
      z.object({
         name: z
            .string({ required_error: "Habilidade não pode ficar vazia." })
            .min(1, "Habilidade não pode ficar vazia."),
      })
   ).min(1, "Pelo menos uma habilidade é obrigatória.").optional(),
   experience: z
      .string({ required_error: "Experiência não pode ficar vazia." })
      .min(1, "Experiência não pode ficar vazia.")
      .optional(),
   education: z
      .string({ required_error: "Formação não pode ficar vazia." })
      .min(1, "Formação não pode ficar vazia.")
      .optional(),
   phoen: z
      .string({ required_error: "Telefone não pode ficar vazio." })
      .min(1, "Telefone não pode ficar vazio.")
      .optional(),
})