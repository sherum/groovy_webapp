import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
// @ts-ignore
import {Amplify, Auth} from 'aws-amplify';
import {environment} from "../environments/environments";
import {Router} from "@angular/router";
import {reportUnhandledError} from "rxjs/internal/util/reportUnhandledError";



//well known openid  https://cognito-idp:us-east-1/us-east-1_VqUBge5a4/.well-known/openid-configuration
//well known openid  https://cognito-idp.us-east-1/us-east-1_vqFpFZzfM/.well-known/openid-configuration
export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject = new BehaviorSubject<boolean>(false);

  authorizedUser = this.authenticationSubject.asObservable()

  constructor(private router:Router) {
    Amplify.configure({
      Auth: environment.cognito,
    });

    // this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.authenticationSubject.next(true);

      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }




  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

}
