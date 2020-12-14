import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalApiService {

  private professionalsUrl: string = environment.apiUrl + 'professionals';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get(this.professionalsUrl + '/all');
  }

  public search(query: any, skip: number, take: number) {
    return this.http.post(this.professionalsUrl + '/search/skip/' + skip + '/take/' + take, query);
  }

  public add(professional: any) {
    return this.http.post(this.professionalsUrl + '/add', professional);
  }

  public update(professional: any) {
    return this.http.put(this.professionalsUrl + '/update', professional);
  }

  public deleteById(id: string) {
    return this.http.delete(this.professionalsUrl + '/delete/' + id);
  }
}
