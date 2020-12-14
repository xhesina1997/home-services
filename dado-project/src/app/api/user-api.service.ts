import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private userUrl: string = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  public register(user: any) {
    return this.http.post(this.userUrl + '/register', user, {responseType: 'json'});
  }

  public signIn(user: any) {
    return this.http.post(this.userUrl + '/signIn', user);
  }

  public refreshToken(token: string) {
    return this.http.post(this.userUrl + '/token/refresh', {token: token});
  }
}
