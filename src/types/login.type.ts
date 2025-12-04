export type SocialLoginReqType = {
  token: string;
  provider: string;
};

export type SocialLoginResType = {
  accessToken: {
    value: string,
    expiredAt: string
  }
}


export type getKakaoTokenReqType = {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
  client_secret: string;
}

export type KakaoTokenResType = {
  access_token: string;
  token_type: string; // "bearer"
  refresh_token: string;
  id_token?: string; // OIDC를 사용한 경우 포함됨
  expires_in: number;
  scope?: string;
  refresh_token_expires_in: number;
}
