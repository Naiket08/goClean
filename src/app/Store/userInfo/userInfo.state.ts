import { userDetails } from "src/app/models/userInfo.model";

export interface UserInfoState {
    isLoading: boolean;
    users: userDetails;
    uId:string;
    error: string | null;
}