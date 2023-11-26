import { z } from "zod";
import { Steps } from "./steps.enum";
export const MAX_FILE_SIZE = 600000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const FormCreateUserSchema = {
  [Steps.Name]: z.object({
    firstName: z.string().min(3, {
      message: "Digite no mínimo 3 caracteres",
    }),
    lastName: z.string().min(3, {
      message: "Digite no mínimo 3 caracteres",
    }),
  }),
  [Steps.Birthday]: z.object({
    birthdayMonth: z.string({
      invalid_type_error: "Mês inválido",
      required_error: "Mês é obrigatória",
    }),
    birthdayYear: z.number({
      invalid_type_error: "Ano inválido",
      required_error: "Ano é obrigatório",
    }),
    birthdayDay: z.number({
      invalid_type_error: "Dia inválido",
      required_error: "Dia é obrigatório",
    }),
  }),
  [Steps.Credentials]: z.object({
    nickName: z.string().min(3, {
      message: "Apelido é obrigatório",
    }),
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
  }),
  [Steps.Interests]: z.object({
    interests: z.optional(z.array(z.string())),
  }),
  [Steps.ProfilePicture]: z.object({
    image: z.string().optional(),
  }),
  [Steps.Confirmation]: z.object({}),
};
