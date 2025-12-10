export type SocialLoginReqType = {
  token: string;
  state?: string;
  provider: string;
};

export type SocialLoginResType = {
  accessToken: {
    value: string;
    expiredAt: string;
  };
};

export type getKakaoTokenReqType = {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
  client_secret: string;
};

export type KakaoTokenResType = {
  access_token: string;
  token_type: string; // "bearer"
  refresh_token: string;
  id_token?: string; // OIDC를 사용한 경우 포함됨
  expires_in: number;
  scope?: string;
  refresh_token_expires_in: number;
};

export type getNaverTokenReqType = {
  grant_type: string;
  client_id: string;
  client_secret: string;
  code: string;
  state: string;
};

export type NaverTokenResType = {
  access_token: string;
  refresh_token: string;
  token_type: string; // "bearer"
  expires_in: number;
};

export type getGoogleTokenReqType = {
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  code: string;
};

export type GoogleTokenResType = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
};
