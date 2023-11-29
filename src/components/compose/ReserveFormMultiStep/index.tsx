import { Form } from "@/components/ui/form";
import { useMemo, useState } from "react";
import StepProgress from "../StepProgress";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Step from "../Step";
import { ReserveSteps } from "./reserve.steps.enum";
import {
  Control,
  UseFormRegister,
  UseFormTrigger,
  useForm,
} from "react-hook-form";
import { IReserveRequestFormSchemeDTO } from "@/interfaces/reserve";
import { FormReserveScheme } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import StepInformation from "./steps/StepInformation";
import { useAuthStore } from "@/store";
import StepPayment from "./steps/StepPayment";
import { ITravelApresentation } from "@/interfaces/travel";
import StepConfirmation from "./steps/StepConfirmation";

interface IReserveFormMultiStepProps {
  reserveDate: {
    to: string;
    from: string;
  };
  onSubmit: (data: IReserveRequestFormSchemeDTO) => void;
  complete: boolean;
  data: ITravelApresentation;
  travelers: number;
}

export interface IReserveStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<IReserveRequestFormSchemeDTO, any>;
  watch?: IReserveRequestFormSchemeDTO;
  trigger?: UseFormTrigger<IReserveRequestFormSchemeDTO>;
  register?: UseFormRegister<IReserveRequestFormSchemeDTO>;
  data?: ITravelApresentation;
  reserveDate?: {
    to: string;
    from: string;
  };
  travelers?: number;
}

const ReserveFormMultiStep = ({
  data,
  reserveDate,
  complete,
  onSubmit,
  travelers,
}: IReserveFormMultiStepProps) => {
  const { user } = useAuthStore();

  const userName = user?.firstName || "";
  const userLastName = user?.lastName || "";
  const userEmail = user?.email || "";

  const maxSteps = 3;
  const [step, setStep] = useState(ReserveSteps.Information);

  const form = useForm<IReserveRequestFormSchemeDTO>({
    resolver: zodResolver(FormReserveScheme[step]),
    mode: "all",
    defaultValues: {
      email: userEmail,
      bookingForAnother: false,
      firstName: userName,
      lastName: userLastName,
      paymentMethod: {
        cardholderName: "",
        cardNumber: 0,
        cvv: 0,
        expirationDate: {
          month: 2,
          year: 2030,
        },
      },
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
    trigger,
    register,
  } = form;
  const watchInstance = watch();
  const disablePreviusButton = step === ReserveSteps.Information;

  const verifyFields = async () => {
    const handler = setTimeout(async () => {
      await trigger();
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  };

  const handlePreviousStep = async () => {
    if (!disablePreviusButton) {
      setStep((current) => current - 1);
    }
    verifyFields();
  };

  const handleSubmitForm = () => {
    onSubmit({
      bookingForAnother: watchInstance.bookingForAnother,
      email: watchInstance.email,
      firstName: watchInstance.firstName,
      lastName: watchInstance.lastName,
      paymentMethod: watchInstance.paymentMethod,
    });
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    if (step === ReserveSteps.Confirmation) return;
    setStep((current) => current + 1);
  };

  const buttonText = useMemo(() => {
    if (step === ReserveSteps.Confirmation) {
      return "Confirmar reserva";
    }

    return "Próximo";
  }, [step]);

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
            step={ReserveSteps.Information}
          >
            <StepInformation
              control={control}
              trigger={trigger}
              watch={watchInstance}
            />
          </Step>
          <Step currentStep={step} step={ReserveSteps.Payment}>
            <StepPayment
              register={register}
              watch={watchInstance}
              control={control}
            />
          </Step>
          <Step currentStep={step} step={ReserveSteps.Confirmation}>
            <StepConfirmation
              watch={watchInstance}
              data={data || undefined}
              reserveDate={reserveDate}
              travelers={travelers}
            />
          </Step>
        </div>
        {step === ReserveSteps.Confirmation ? (
          <Button
            key="submit-create-user"
            className={cn(
              "mt-5 w-full",
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
            className="mt-5 w-full"
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

export default ReserveFormMultiStep;
