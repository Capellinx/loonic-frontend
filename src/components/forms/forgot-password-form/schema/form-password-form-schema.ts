import z from "zod"

const forgotPasswordSchema = z.object({
   email: z
      .string({ required_error: "E-mail é obrigatório." })
      .email({ message: "E-mail inválido." })
      .min(1, "E-mail é obrigatório."),
})

export { forgotPasswordSchema }