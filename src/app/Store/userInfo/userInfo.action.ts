import { createAction, props } from "@ngrx/store";
import { userDetails } from "src/app/models/userInfo.model";

export const postLoading = createAction('[Posts] Post loading',props<{isLoading: boolean}>());
export const postUsers = createAction(
    '[Posts] Get Posts success',
    props<{ users: userDetails }>()
  );