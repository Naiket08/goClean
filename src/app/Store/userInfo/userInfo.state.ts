import { userDetails } from "src/app/models/userInfo.model";

export interface UserInfoState {
    isLoading?: boolean;
    users?: userDetails;
    uId?:string;
    newUser?: boolean;
    error?: string | null;
}