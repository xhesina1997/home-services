import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobPostingApiService {

  private jobPostingsUrl: string = environment.apiUrl + 'job/postings';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get(this.jobPostingsUrl + '/all');
  }

  public search(query: any, skip: number, take: number) {
    return this.http.post(this.jobPostingsUrl + '/search/skip/' + skip + '/take/' + take, query);
  }

  public add(jobPosting: any) {
    return this.http.post(this.jobPostingsUrl + '/add', jobPosting);
  }

  public update(jobPosting: any) {
    return this.http.put(this.jobPostingsUrl + '/update', jobPosting);
  }

  public deleteById(id: string) {
    return this.http.delete(this.jobPostingsUrl + '/delete/' + id);
  }
}
