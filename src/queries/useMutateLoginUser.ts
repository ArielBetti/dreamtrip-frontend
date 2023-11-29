import { postUserLogin } from "@/service/postUserLogin";
import { useMutation } from "react-query";

export const useMutateLoginUser = () => {
  return useMutation({
    mutationFn: postUserLogin,
  });
};
