import { z } from "zod";
import { ReserveSteps } from "./reserve.steps.enum";

export const FormReserveScheme = {
  [ReserveSteps.Information]: z.object({
    firstName: z.string().min(3, {
      message: "Digite no mínimo 3 caracteres",
    }),
    lastName: z.string().min(3, {
      message: "Digite no mínimo 3 caracteres",
    }),
    email: z
      .string()
      .min(5, {
        message: "Email é obrigatório",
      })
      .email({
        message: "Email inválido",
      }),
    bookingForAnother: z.boolean(),
  }),
  [ReserveSteps.Payment]: z.object({
    paymentMethod: z.object({
      cardNumber: z.string().refine(
        (value) => {
          // Remove espaços em branco e verifica se o número tem entre 16 e 19 dígitos
          const cleanedValue = value.replace(/\s/g, "");
          return /^[0-9]{16,19}$/.test(cleanedValue);
        },
        { message: "Número do cartão inválido" }
      ),
      cardholderName: z
        .string()
        .min(3, { message: "Nome do titular inválido" })
        .refine(
          (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          },
          {
            message:
              "Nome do titular não deve conter caracteres especiais ou números",
          }
        ),
      expirationDate: z.object({
        month: z.number().min(1, {
          message: "Mês inválido",
        }),
        year: z.number().min(4, {
          message: "Ano inválido",
        }),
      }),
      cvv: z
        .string()
        .min(3, { message: "CVV inválido" })
        .max(4, { message: "CVV inválido" })
        .refine(
          (value) => {
            // Adicione sua lógica de validação personalizada aqui
            // Retorna verdadeiro se o CVV não contiver caracteres especiais ou letras
            return /^[0-9]*$/.test(value);
          },
          { message: "CVV não deve conter caracteres especiais ou letras" }
        ),
    }),
  }),
  [ReserveSteps.Confirmation]: z.object({}),
};
