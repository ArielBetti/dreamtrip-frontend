import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const oldCreateUserValidation = z.object({
  email: z
    .string()
    .min(5, {
      message: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
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
  firstName: z.string().min(3, {
    message: "Nome é obrigatório",
  }),
  lastName: z.string().min(3, {
    message: "Sobrenome é obrigatório",
  }),
  nickName: z.string().min(3, {
    message: "Apelido é obrigatório",
  }),
  image: z.object({
    profileImage: z
      .any()
      .optional()
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "O tamanho máximo da imagem é de 500MB"
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  }),
  password: z.string().min(6, {
    message: "Digite uma senha com no mínimo 6 caracteres",
  }),
  interests: z.optional(z.array(z.string())),
});
