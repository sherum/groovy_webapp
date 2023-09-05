import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CognitoService, IUser} from "../../services/cognito.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  loading: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/stories']);
      }).catch(() => {
      this.loading = false;
    });
  }

  protected readonly addEventListener = addEventListener;
}
