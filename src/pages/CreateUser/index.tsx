import { useHeaderActions } from "@/store";
import { useMutateCreateUser } from "@/queries/useMutateCreateUser";
import { useEffect } from "react";
import CreateUserMultiStepForm from "@/components/compose/CreateUserMultiStepForm";

const CreateUser = () => {
  const { setHeader } = useHeaderActions();

  const {
    mutate: createUser,
    isLoading: isCreatingUser,
    error: createUserError,
    isError: isCreatingUserError,
  } = useMutateCreateUser();

  // function onSubmit(data: ICreateUserRequestFormDTO) {
  //   const teste = 1 > 2;
  //   if (teste) {
  //     return createUser({
  //       birthday: new Date(),
  //       email: data.email,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       nickName: data.nickName,
  //       password: data.password,
  //       image: data?.image || undefined,
  //       interests: data?.interests || [],
  //     });
  //   }
  // }

  useEffect(() => {
    setHeader({
      title: "Criar conta",
      loading: false,
    });
  }, []);

  return (
    <div className="flex md:items-center items-start justify-center min-h-screen container mx-auto px-4 py-16 w-full">
      <div className="w-full max-w-md">
        <CreateUserMultiStepForm onSubmit={() => {}} />
      </div>
    </div>
  );
};

export default CreateUser;
