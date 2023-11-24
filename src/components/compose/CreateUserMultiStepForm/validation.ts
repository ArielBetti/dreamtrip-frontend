import { z } from "zod";
import { Steps } from "./steps.enum";

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
    birthdayMonth: z.number({
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
  [Steps.Credentials]: z.object({}),
  [Steps.Interests]: z.object({}),
  [Steps.ProfilePicture]: z.object({}),
  [Steps.Confirmation]: z.object({}),
};
