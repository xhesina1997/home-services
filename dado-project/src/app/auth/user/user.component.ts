import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserApiService} from '../../api/user-api.service';
import {AuthenticationService} from '../../api/authentication.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public action: string;
  private paramsSubscription: Subscription;
  private isLoginFinishedSubscription: Subscription;
  public email: string;
  public password: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userApiService: UserApiService,
    private toastrService: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.isLoginFinishedSubscription = this.authenticationService.isLoginFinished.subscribe((finished: boolean) => {
      if (finished) {
        if (this.authenticationService.isLoggedIn) {
          this.navigateToHome();
          return;
        }
        this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
          this.action = params.action;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribeFromSubscription();
  }

  private unSubscribeFromSubscription(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.isLoginFinishedSubscription) {
      this.isLoginFinishedSubscription.unsubscribe();
    }
  }

  public register(): void {
    if (this.isEmailAndPasswordValid()) {
      this.sendRegisterRequest();
    } else {
      this.popCredentialsMessage();
      return;
    }
  }

  public login(): void {
    if (this.isEmailAndPasswordValid()) {
      this.sendLoginRequest();
    } else {
      this.popCredentialsMessage();
      return;
    }
  }

  private isEmailAndPasswordValid(): boolean {
    if (!this.email || !this.password || this.email.length === 0 || this.password.length <= 6) {
      return false;
    }
    return true;
  }

  private popCredentialsMessage(): void {
    this.toastrService.error('Ju lutem plotesoni sakte email dhe fjalekalimin!. Fjalekalimi duhet te jete me shume se 6 karaktere!');
  }

  private sendRegisterRequest(): void {
    const user = {'email': this.email, 'password': this.authenticationService.hashedKey(this.password)};
    this.userApiService.register(user).subscribe((data: any) => {
      this.authenticationService.setAuthDataFromToken(data.token);
      this.navigateToHome();
    }, error => {
      if (error.status === 409) {
        this.toastrService.error('Ky email eshte i regjistruar me pare! Provoni nje email tjeter!');
      } else {
        console.log(error);
      }
    });
  }

  private sendLoginRequest(): void {
    const user = {'email': this.email, 'password': this.authenticationService.hashedKey(this.password)};
    this.userApiService.signIn(user).subscribe((data: any) => {
      this.authenticationService.setAuthDataFromToken(data.token);
      this.navigateToHome();
    }, error => {
      if (error.status === 401) {
        this.toastrService.error('Kredenciale te gabuara! Ju lutem fusni email dhe fjalekalimin e sakte!');
      } else {
        console.log(error);
      }
    });
  }

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
