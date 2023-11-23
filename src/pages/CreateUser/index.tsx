import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useHeaderActions } from "@/store";
import { ICreateUserRequestFormDTO } from "@/interfaces/user";
import { useMutateCreateUser } from "@/queries/useMutateCreateUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

enum Steps {
  Name,
  Birthday,
  Credentials,
  Interests,
  Image,
  Confirm,
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
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

const CreateUser = () => {
  const [step, setStep] = useState(Steps.Name);

  const { setHeader } = useHeaderActions();
  const {
    mutate: createUser,
    isLoading: isCreatingUser,
    error: createUserError,
    isError: isCreatingUserError,
  } = useMutateCreateUser();

  setHeader({
    title: "Criar conta",
    loading: false,
  });

  const form = useForm<ICreateUserRequestFormDTO>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: ICreateUserRequestFormDTO) {
    if (Steps.Confirm) {
      return createUser({
        birthday: new Date(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        password: data.password,
        image: data?.image || undefined,
        interests: data?.interests || [],
      });
    }

    setStep(step + 1);
  }

  return (
    <div className="flex items-center justify-center h-screen container mx-auto px-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <Button variant="link" className="p-0">
              <PencilIcon className="w-4 h-4 mr-1" />
              Editar anterior
            </Button>
          </div>
          {step === Steps.Name && (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro nome</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Tibério"
                      />
                    </FormControl>
                    <FormDescription>
                      Seu nome não séra publico, apenas para identificação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Dreamtrip da Silva"
                      />
                    </FormControl>
                    <FormDescription>
                      Seu sobrenome não séra publico, apenas para identificação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {step}
          <Button type="submit">Próximo</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateUser;
