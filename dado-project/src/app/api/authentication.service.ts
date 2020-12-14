import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';
import {UserApiService} from './user-api.service';
import {BehaviorSubject} from 'rxjs';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedIn = false;

  public isLoginFinished: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public userData: any;

  public token: string;

  private jwtHelperService;

  constructor(private cookieService: CookieService, private userApiService: UserApiService) {
    this.jwtHelperService = new JwtHelperService();
  }

  public setAuthDataFromToken(token: string): void {
    const decodedToken = this.jwtHelperService.decodeToken(token);
    this.userData = decodedToken.user;
    this.token = token;
    this.isLoggedIn = true;
    this.cookieService.set('Token', token);
  }

  public tryAuthenticationFromCookie(): void {
    const tokenFromCookie: string = this.cookieService.get('Token');
    if (tokenFromCookie) {
      this.userApiService.refreshToken(tokenFromCookie).subscribe((data: any) => {
        this.setAuthDataFromToken(data.token);
        this.isLoginFinished.next(true);
      }, error => {
        console.log(error);
        this.isLoginFinished.next(true);
      });
    } else {
      this.isLoginFinished.next(true);
    }
  }

  public logOut(): void {
    this.isLoggedIn = false;
    this.userData = null;
    this.token = null;
    this.cookieService.delete('Token');
  }

  public hashedKey(key: any) {
    return Md5.hashStr(key);
  }

}
