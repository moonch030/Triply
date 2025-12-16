import Http from "@/lib/httpClients";
import { errorResponse, succesResponse } from "@/lib/response";
import type {
  getKakaoTokenReqType,
  getNaverTokenReqType,
  getGoogleTokenReqType,
  KakaoTokenResType,
  NaverTokenResType,
  GoogleTokenResType,
  SocialLoginReqType,
  SocialLoginResType,
} from "@/types/login.type";
import axios from "axios";

const endpoint = "/user/social/login";

export async function socialLoginApi(params: SocialLoginReqType) {
  return Http.instance
    .post<SocialLoginResType>(`${endpoint}`, params, {
      withCredentials: true,
    })
    .then((response) => {
      const { userId, userName } = response.data;

      localStorage.setItem('userId', userId.toString());
      localStorage.setItem("userName", userName);

      return succesResponse(response);
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
    console.error("카카오 토큰 요청 실패:", err);
    throw new Error("카카오 인증에 실패했습니다.");
  }
}

export async function getNaverTokenApi(params: getNaverTokenReqType) {
  const body = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  });

  try {
    const response = await axios.post<NaverTokenResType>(
      "https://nid.naver.com/oauth2.0/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("네이버 토큰 요청 실패:", err);
    throw new Error("네이버 인증에 실패했습니다.");
  }
}
export async function getGoogleTokenApi(params: getGoogleTokenReqType) {
  const body = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  });

  try {
    const response = await axios.post<GoogleTokenResType>(
      "https://oauth2.googleapis.com/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("구글 토큰 요청 실패:", err);
    throw new Error("구글 인증에 실패했습니다.");
  }
}
