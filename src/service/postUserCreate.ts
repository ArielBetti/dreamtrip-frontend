import { ICreateUserRequestDTO, ICreateUserReturnDTO } from "@/interfaces/user";
import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";

export const postUserCreate = async (
  body: ICreateUserRequestDTO
): Promise<ICreateUserReturnDTO> => {
  const { data } = await requester({}).post<ICreateUserReturnDTO>(
    `${ENDPOINTS.createUser}`,
    {
      FormData: body,
    }
  );

  return data;
};
