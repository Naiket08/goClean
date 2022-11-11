
import { createReducer, on } from "@ngrx/store";
import { ActionCodeOperation } from "firebase/auth";
import * as UserActions from "./userInfo.action";
import { UserInfoState } from "./userInfo.state";

export const initialState: UserInfoState = {
    isLoading: false,
    users: {
        userdetails: {
            firstname: '',
            lastname: '',
            emailId: '',
            PhoneNumber: 0,
            isNewUser: false
        },
        devices: {
            laundryBasketStatus: 0,
            DustbinStatus: false,
            ventStatus: ''
        }
    },
    error: null

};

export const reducers = createReducer(
    initialState,
    on(UserActions.postLoading, (state) => ({ ...state, isLoading: true })),
    on(UserActions.postUsers, (state, action) => ({ ...state, isLoading: false, users: action.users  })),

    // on(UserActions.getPostsSuccess, (state, action) => ({
    //   ...state,
    //   isLoading: false,
    //   posts: action.posts,
    // })),
    // on(UserActions.getPostsFailure, (state, action) => ({
    //   ...state,
    //   isLoading: false,
    //   error: action.error,
    // }))
  );