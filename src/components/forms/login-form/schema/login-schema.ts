import z from "zod"

const loginSchema = z.object({
   email: z
      .string({ required_error: "E-mail é obrigatório." })
      .email({ message: "E-mail inválido." })
      .min(1, "E-mail é obrigatório."),
   password: z
      .string({required_error: "Senha é obrigatória"})
      .min(1, "Senha é obrigatória."),
})

export { loginSchema }