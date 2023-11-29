import { IUserLoginRequestDTO, IUserLoginResponseDTO } from "@/interfaces/user";
import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";

export const postUserLogin = async (
  body: IUserLoginRequestDTO
): Promise<IUserLoginResponseDTO> => {
  const { data } = await requester({}).post<IUserLoginResponseDTO>(
    `${ENDPOINTS.loginUser}`,
    body
  );

  return data;
};
