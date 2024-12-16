export type AccessTokenReqBody = {
  grant_type: "authorization_code";
  code:string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
};

export type DataFetchHeader = {
    headers:{
        Authorization:string,
    }
}