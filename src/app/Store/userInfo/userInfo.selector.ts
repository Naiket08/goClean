import { createSelector } from "@ngrx/store";
import { GlobalStateInterface } from "src/app/models/globalState.interface";

export const selectFeature=(state: GlobalStateInterface) => state.userInfo;


export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
  );
  
  export const userSelector = createSelector(
    selectFeature,
    (state) => state.users
  );
  
  export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
  );