import { z } from "zod";

export const registerSchema = z.object({
   email: z
      .string({ required_error: "E-mail é obrigatório" })
      .email("E-mail inválido"),
   password: z
      .string({ required_error: "Senha é obrigatório" })
      .min(8, "É nesessário ao menos 8 caracteres.")
      .regex(/[0-9]+/, "É necessário pelo menos um numero")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/[^A-Za-z0-9]/, "É necessário pelo menos um caracter especial"),
   confirmPassword: z
      .string({ required_error: "Confirmar senha é obrigatório" })
      .min(1, "Este campo é obrigatório"),
}).refine(
   ({ password, confirmPassword }) => {
      return password === confirmPassword;
   },
   {
      message: "As senhas não correspondem",
      path: ["confirmPassword"],
   }
);