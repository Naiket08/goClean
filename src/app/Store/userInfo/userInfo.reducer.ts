
import { createReducer, on } from "@ngrx/store";
import { ActionCodeOperation } from "firebase/auth";
import * as UserActions from "./userInfo.action";
import { UserInfoState } from "./userInfo.state";

export const initialState: UserInfoState = {
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
        ventStatus: false,
        washingMachineStatus: false,
        laundryBasket: 'NI',
        Dustbin: 'NI',
        vent: 'NI',
        washingMachine: 'NI'
    },
    room: {
        room1: false,
        room2: true,
        room3: false,
        room4: false
    }
}


};

export const reducers = createReducer(
    initialState,
    on(UserActions.postLoading, (state) => ({ ...state, isLoading: true })),
    on(UserActions.postUid, (state, action) => ({ ...state, uId: action.uId })),
    on(UserActions.postUsers, (state, action) => ({ ...state, users: action.users })),
    on(UserActions.postNewUser, (state, action) => ({ ...state, newUser: action.newUser }))
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