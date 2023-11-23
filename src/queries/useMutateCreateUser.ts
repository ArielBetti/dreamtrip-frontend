import { postUserCreate } from "@/service/postUserCreate";
import { useMutation } from "react-query";

export const useMutateCreateUser = () => {
  return useMutation({
    mutationFn: postUserCreate,
  });
};
