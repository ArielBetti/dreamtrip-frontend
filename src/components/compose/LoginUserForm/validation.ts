import { z } from "zod";

export const FormLoginUserSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  password: z.string().min(6, {
    message: "Digite uma senha com no mínimo 6 caracteres",
  }),
});
