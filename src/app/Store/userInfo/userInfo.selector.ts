import { createSelector } from "@ngrx/store";
import { GlobalStateInterface } from "src/app/models/globalState.interface";
import { UserInfoState } from "./userInfo.state";

export const selectFeature=(state: UserInfoState) => state;


export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
  );
  
  export const userSelector = createSelector(
    selectFeature,
    (state) => state.users
  );

  export const uIDSelector = createSelector(
    selectFeature,
    (state) => state.uId
  );

  export const newUserSelector = createSelector(
    selectFeature,
    (state) => state.newUser
  );
  
  export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
  );