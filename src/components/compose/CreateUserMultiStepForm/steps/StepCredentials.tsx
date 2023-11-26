import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ICreateUserStepProps } from "..";
import { Input } from "@/components/ui/input";

const StepCredentials = ({ control }: ICreateUserStepProps) => {
  control?.register("nickName", {});
  return (
    <div className="flex flex-col justify-start items-start w-full gap-4">
      <FormField
        defaultValue="JohnDuedasdadsa"
        control={control}
        name="nickName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Nome de usuário</FormLabel>
            <FormControl>
              <Input
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="JohnDue"
              />
            </FormControl>
            <FormDescription>
              Esse nome séra público e poderá ser visto por outros usuários
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="john.due@dreamtrip.com"
              />
            </FormControl>
            <FormDescription>
              Email usado para entrar na sua conta e receber notificações
            </FormDescription>
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
    </div>
  );
};

export default StepCredentials;
