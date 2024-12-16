import { AccessTokenReqBody, DataFetchHeader } from "../types/linkedinRequest";
import { LinkedinResponse } from "../types/response";
import { LinkedinRequest } from "./request";

export class Linkedin extends LinkedinRequest {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  public constructor(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
  ) {
      super();
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
  }

  private getAccessBody(code:string):AccessTokenReqBody{
    return {    
        grant_type: "authorization_code",
        code,
        client_id:this.client_id,
        client_secret:this.client_secret,
        redirect_uri:this.redirect_uri,
    }
  }

  private getFetchDataHeader(access_token:string):DataFetchHeader{
    return { headers: { Authorization: `Bearer ${access_token}` } };
  }

  
  public async getData(code:string):Promise<LinkedinResponse>{
    const accessReqBody = this.getAccessBody(code);
    const accessTokenResponse = await this.getAccessToken(accessReqBody);
    if(!accessTokenResponse.success || !accessTokenResponse.access_token){
        console.log("Something went wrong while requesting AccessToken")
        return {success:false}
    }

    const headerForDataFetch = this.getFetchDataHeader(accessTokenResponse.access_token);
    const dataFetchResponse = await this.getUserData(headerForDataFetch);
    if(!dataFetchResponse.success || !dataFetchResponse.userData){
        console.error(dataFetchResponse.msg||"Something went wrong while requesting Data");
        return {success:false};
    }
    return {success:true,userData:dataFetchResponse.userData};
  }
}