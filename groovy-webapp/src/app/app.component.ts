import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CognitoService} from "./services/cognito.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  authorizedUser = this.cognitoService.authorizedUser;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {

    this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        this.isAuthenticated = true;
      });
  }

  public signOut(): void {
    this.isAuthenticated = false;
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

}
