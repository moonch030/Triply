import Http from "@/lib/httpClients";
import { errorResponse, succesResponse } from "@/lib/response";
import type { getKakaoTokenReqType, KakaoTokenResType, SocialLoginReqType, SocialLoginResType } from "@/types/login.type";
import axios from "axios";

const endpoint = "/user/social/login";

export async function socialLoginApi(params: SocialLoginReqType) {
  return Http.instance
    .post<SocialLoginResType>(`${endpoint}`, params, {
      withCredentials: true,
    })
    .then((reponse) => {
      return succesResponse(reponse);
    })
    .catch(errorResponse());
}

export async function getKakaoTokenApi(params: getKakaoTokenReqType) {
  const body = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  });

  try {
    const response = await axios.post<KakaoTokenResType>(
      "https://kauth.kakao.com/oauth/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}
