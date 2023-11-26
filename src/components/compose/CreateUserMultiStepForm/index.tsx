import { useMemo, useState } from "react";
import { Steps } from "./steps.enum";
import { Control, UseFormTrigger, useForm } from "react-hook-form";
import { ICreateUserRequestFormDTO } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCreateUserSchema } from "./validation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Step from "../Step";
import StepName from "./steps/StepName";
import StepProgress from "../StepProgress";
import StepBirthday from "./steps/StepBirthday";
import { cn } from "@/lib/utils";
import StepCredentials from "./steps/StepCredentials";
import StepInterests from "./steps/StepInterests";
import StepImage from "./steps/StepImage";
import StepConfirmation from "./steps/StepConfirmation";

interface ICreateUserMultiStepFormProps {
  onSubmit: (data: ICreateUserRequestFormDTO) => void;
}

export interface ICreateUserStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<ICreateUserRequestFormDTO, any>;
  watch?: ICreateUserRequestFormDTO;
  trigger?: UseFormTrigger<ICreateUserRequestFormDTO>;
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
    trigger,
  } = form;

  const watchInstance = watch();
  const disablePreviusButton = step === Steps.Name || complete;

  const verifyFields = async () => {
    await trigger();
  };

  const handlePreviousStep = async () => {
    if (!disablePreviusButton) {
      setStep((current) => current - 1);
    }
    const handler = setTimeout(() => {
      verifyFields();
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  };

  const handleSubmitForm = () => {
    onSubmit({
      ...watchInstance,
    });
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    if (step === Steps.Confirmation) return;
    setStep((current) => current + 1);
  };

  const buttonText = useMemo(() => {
    if (step === Steps.Confirmation) {
      return "Criar conta";
    }

    if (step === Steps.ProfilePicture && !watchInstance.image) {
      return "Continuar sem foto";
    }

    return "Próximo";
  }, [step, watchInstance]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 w-full transition-all"
        onSubmit={handleSubmit(handleSubmitForm)}
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
            <StepBirthday
              trigger={trigger}
              watch={watchInstance}
              control={control}
            />
          </Step>
          <Step currentStep={step} step={Steps.Credentials}>
            <StepCredentials control={control} />
          </Step>
          <Step currentStep={step} step={Steps.Interests}>
            <StepInterests control={control} />
          </Step>
          <Step currentStep={step} step={Steps.ProfilePicture}>
            <StepImage watch={watchInstance} control={control} />
          </Step>
          <Step currentStep={step} step={Steps.Confirmation}>
            <StepConfirmation completed={complete} watch={watchInstance} />
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
            className="z-40 md:mt-5 fixed md:relative max-md:bottom-0 max-md:left-0 max-md:rounded-none w-full"
            disabled={!isValid}
            onClick={handleNextStep}
            type="button"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateUserMultiStepForm;
