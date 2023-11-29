import { useAuthActions, useHeaderActions } from "@/store";
import { useMutateCreateUser } from "@/queries/useMutateCreateUser";
import { useEffect, useState } from "react";
import CreateUserMultiStepForm from "@/components/compose/CreateUserMultiStepForm";
import {
  ICreateUserRequestFormDTO,
  ICreateUserReturnDTO,
} from "@/interfaces/user";
import CustomAlertDialog from "@/components/compose/CustomAlertDialog";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/routes/routes";
import BackdropLoader from "@/components/compose/BackdropLoading";

const CreateUser = () => {
  const { setToken, setUser } = useAuthActions();
  const [complete, setComplete] = useState(false);
  const [newUser, setNewUser] = useState<ICreateUserReturnDTO | null>(null);
  const { setHeader } = useHeaderActions();
  const [welcomeDialog, setWelcomeDialog] = useState(false);
  const navigate = useNavigate();

  const {
    mutate: createUser,
    isLoading: isLoadingCreateUser,
    error: createUserError,
    isError: isErrorCreateUser,
  } = useMutateCreateUser();

  function onSubmit(data: ICreateUserRequestFormDTO) {
    const birthday = new Date(
      `${data.birthdayMonth}/${data.birthdayDay}/${data.birthdayYear}`
    );

    createUser(
      {
        birthday: birthday,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        password: data.password,
        image: data?.image || undefined,
        interests: data?.interests || [],
      },
      {
        onSuccess: (result) => {
          setToken(result.token);
          setUser(result);
          setWelcomeDialog(true);
          setNewUser(result);
          setComplete(true);
        },
      }
    );
  }

  const handleCloseWelcomeDialog = () => {
    setWelcomeDialog(false);
    navigate(ROUTE.home);
  };

  useEffect(() => {
    setHeader({
      title: "Criar conta",
      loading: false,
    });
  }, []);

  return (
    <div className="flex md:items-center items-start justify-center min-h-screen container mx-auto px-4 py-16 w-full">
      <BackdropLoader open={isLoadingCreateUser} />
      <div className="w-full max-w-md">
        <CreateUserMultiStepForm
          complete={complete}
          onSubmit={(data: ICreateUserRequestFormDTO) => onSubmit(data)}
        />
        <CustomAlertDialog
          closeTitle="Continuar"
          description="Agora você pode desfrutar de todos os recursos do nosso aplicativo."
          setOpen={handleCloseWelcomeDialog}
          open={welcomeDialog}
          title={`Bem vindo, ${newUser?.nickName || ""}!`}
        />
      </div>
    </div>
  );
};

export default CreateUser;
