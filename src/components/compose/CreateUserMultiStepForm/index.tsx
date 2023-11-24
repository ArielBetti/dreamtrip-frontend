import { useMemo, useState } from "react";
import { Steps } from "./steps.enum";
import { Control, useForm } from "react-hook-form";
import { ICreateUserRequestFormDTO } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCreateUserSchema } from "./validation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Step from "../Step";
import StepName from "./StepName";
import StepProgress from "../StepProgress";
import StepBirthday from "./StepBirthday";
import { cn } from "@/lib/utils";

interface ICreateUserMultiStepFormProps {
  onSubmit: () => void;
}

export interface ICreateUserStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ICreateUserRequestFormDTO, any>;
  watch?: ICreateUserRequestFormDTO;
}

const CreateUserMultiStepForm = ({
  onSubmit,
}: ICreateUserMultiStepFormProps) => {
  const maxSteps = 6;
  const [complete, setComplete] = useState(false);
  const [step, setStep] = useState(Steps.Name);

  const form = useForm<ICreateUserRequestFormDTO>({
    resolver: zodResolver(FormCreateUserSchema[step]),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      interests: [],
      image: undefined,
      nickName: "",
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = form;

  const watchInstance = watch();
  const disablePreviusButton = step === Steps.Name || complete;

  const handleSubmitForm = () => {
    console.log("bateu");
    setComplete(true);
    onSubmit();
  };

  const handlePreviousStep = () => {
    if (!disablePreviusButton) {
      setStep((current) => current - 1);
    }
  };

  const handleNextStep = () => {
    if (step === Steps.Confirmation) return;
    setStep((current) => current + 1);
  };

  const buttonText = useMemo(() => {
    if (step === Steps.Confirmation) {
      return "Criar conta";
    }

    if (
      step === Steps.ProfilePicture &&
      form.getValues("image") === undefined
    ) {
      return "Continuar sem foto";
    }

    return "Próximo";
  }, [form, step]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 w-full transition-all"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <div className="animate-fadeIn">
          <div className="w-full py-5">
            <StepProgress
              completeAll={complete}
              currentStep={step}
              totalSteps={maxSteps}
            />
          </div>
          <Button
            disabled={disablePreviusButton}
            onClick={handlePreviousStep}
            variant="link"
            className="p-0"
            type="button"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Editar anterior
          </Button>
        </div>
        <div className="min-h-[165px]">
          <Step
            className="flex flex-col items-start justify-start w-full gap-5"
            currentStep={step}
            step={Steps.Name}
          >
            <StepName control={control} />
          </Step>
          <Step currentStep={step} step={Steps.Birthday}>
            <StepBirthday watch={watchInstance} control={control} />
          </Step>
          <Step currentStep={step} step={Steps.Credentials}>
            <div>Credenciais</div>
          </Step>
          <Step currentStep={step} step={Steps.Interests}>
            <div>Interesses</div>
          </Step>
          <Step currentStep={step} step={Steps.ProfilePicture}>
            <div>Foto de perfil</div>
          </Step>
          <Step currentStep={step} step={Steps.Confirmation}>
            <div>Confirmação</div>
          </Step>
        </div>
        {step === Steps.Confirmation ? (
          <Button
            key="submit-create-user"
            className={cn(
              "md:mt-5 fixed md:relative max-md:bottom-0 max-md:left-0 max-md:rounded-none w-full",
              complete && "animate-leaveDown"
            )}
            disabled={!isValid}
            type="submit"
          >
            {buttonText}
          </Button>
        ) : (
          <Button
            key="next-step-create-user"
            className="md:mt-5 fixed md:relative max-md:bottom-0 max-md:left-0 max-md:rounded-none w-full"
            disabled={!isValid}
            onClick={handleNextStep}
            type="button"
          >
            {buttonText}
          </Button>
        )}
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </Form>
  );
};

export default CreateUserMultiStepForm;
