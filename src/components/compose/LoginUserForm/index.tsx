import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IUserLoginRequestDTO } from "@/interfaces/user";
import { useForm } from "react-hook-form";
import { FormLoginUserSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingStatus from "../LoadingStatus";

interface ILoginUserFormProps {
  onSubmit: (data: IUserLoginRequestDTO) => void;
  loading: boolean;
  isError: boolean;
  errorMessage: string;
}

const LoginUserForm = ({
  onSubmit,
  loading,
  errorMessage,
  isError,
}: ILoginUserFormProps) => {
  const form = useForm<IUserLoginRequestDTO>({
    resolver: zodResolver(FormLoginUserSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = form;

  const watchInstance = watch();

  const handleSubmitForm = () => {
    onSubmit({
      ...watchInstance,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 w-full transition-all"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="john.due@dreamtrip.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="●●●●●●●●"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-start justify-start gap-2 min-h-[30px]">
          {loading && (
            <>
              <LoadingStatus size={20} />
              <span className="text-sm">Carregando...</span>
            </>
          )}
          {isError && (
            <>
              <span className="text-sm text-red-600">{errorMessage}</span>
            </>
          )}
        </div>
        <Button
          key="submit-create-user"
          className="mt-5 w-full"
          disabled={!isValid || loading}
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginUserForm;
