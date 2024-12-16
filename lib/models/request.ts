import axios from "axios";
import { AccessTokenReqBody, DataFetchHeader } from "../types/linkedinRequest";
import {
  ACCESS_TOKEN_REQUEST_HEADER,
  LINKEDIN_AUTH_V2_URL,
  LINKEDIN_FETCH_DATA_URL,
} from "../constants/linkedin";

export class LinkedinRequest {
  public async getAccessToken(reqBody: AccessTokenReqBody):Promise<{ success: boolean; access_token?: string; }> {
    try {
      const accessTokenResp = await axios.post(
        LINKEDIN_AUTH_V2_URL,
        reqBody,
        ACCESS_TOKEN_REQUEST_HEADER
      );

      if (
        !accessTokenResp.data.access_token 
        
      ) {
        console.log("Access Token is not available ");
        return { success: false };
      } else {
        let access_token = "";
        if (typeof accessTokenResp.data.access_token === "string"){
            access_token = accessTokenResp.data.access_token;
        }
          return {
            success: true,
            access_token,
          };
      }

    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }

  public async getUserData(header:DataFetchHeader):Promise<{success:boolean,userData?:any,msg?:string}>{
    try{
        const userInfo = await axios.get(LINKEDIN_FETCH_DATA_URL, header);
        if (!userInfo.data.name) {
          return { success: false, msg: "Could not find profile" };
        }
        return {success:true,userData:userInfo.data}
    }catch(e){
         console.log(e);
         return { success: false };
    }
  } 

  // public async vanityData
}
