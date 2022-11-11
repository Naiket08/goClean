import { userDetails } from "src/app/models/userInfo.model";

export interface UserInfoState {
    isLoading: boolean;
    users: userDetails;
    error: string | null;
}