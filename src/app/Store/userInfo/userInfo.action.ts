import { createAction, props } from "@ngrx/store";
import { userDetails } from "src/app/models/userInfo.model";

export const postLoading = createAction('[Posts] Post loading',props<{isLoading: boolean}>());
export const postUsers = createAction(
    '[Posts] user data update success',
    props<{ users: userDetails }>()
  );
  export const postUid = createAction('[Posts] Post Uid',props<{uId: string}>());
