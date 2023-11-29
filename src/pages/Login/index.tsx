import LoginUserForm from "@/components/compose/LoginUserForm";
import { IUserLoginRequestDTO } from "@/interfaces/user";
import { useMutateLoginUser } from "@/queries/useMutateLoginUser";
import { ROUTE } from "@/routes/routes";
import { useAuthActions } from "@/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthActions();

  const {
    mutate: loginUser,
    isLoading: isLoadingLoginUser,
    error: loginUserError,
    isError: isErrorLoginUser,
  } = useMutateLoginUser();

  function onSubmit(data: IUserLoginRequestDTO) {
    loginUser(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (result) => {
          setToken(result.token);
          setUser(result);
          navigate(ROUTE.home);
        },
      }
    );
  }

  return (
    <div className="flex md:items-center items-start justify-center min-h-screen container mx-auto px-4 py-16 w-full">
      <div className="w-full max-w-md">
        <LoginUserForm
          isError={isErrorLoginUser}
          errorMessage={
            axios.isAxiosError(loginUserError)
              ? loginUserError.response?.data.error
              : "Ocorreu um erro inesperado, tente novamente mais tarde."
          }
          loading={isLoadingLoginUser}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
