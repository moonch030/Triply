import Http from "@/lib/httpClients";
import { errorResponse, succesResponse } from "@/lib/response";
import type { SocialLoginType } from "@/types/login.type";
import type { ApiResponse } from "@/types/response.type";

const endpoint = "user/social/login";

export async function socialLoginApi(params: SocialLoginType) {
  return Http.instance
    .post<ApiResponse<string>>(`${endpoint}`, params)
    .then((reponse) => {
      const result = succesResponse(reponse);

      return result;
    })
    .catch(errorResponse());
}
