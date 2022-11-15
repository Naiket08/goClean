import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserinfoService } from "src/app/Components/helper/userinfo.service";
import * as UserActions from './userInfo.action'

@Injectable()
export class PostEffects {
    getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.postLoading),
      mergeMap(() => {
        return this.userInfoService.getUserInfo().pipe(
          map(() => UserActions.postUsers({  }))
        );
      })
    )
  );

  constructor(private actions$: Actions, private userInfoService: UserinfoService) {}

}