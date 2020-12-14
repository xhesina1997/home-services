import {Component, OnInit} from '@angular/core';
import {JobPostingApiService} from '../../api/job-posting-api.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  public action: string;
  private paramsSubscription: Subscription;
  public posts: any[] = [];

  constructor(private jobPostingApiService: JobPostingApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.action = params.action;
      if (this.action !== 'null') {
        this.getPosts(params.action);
      } else {
        this.getAllPosts();
      }
    });
  }

  getPosts(param) {
    if (param === 'child-care') {
      this.jobPostingApiService.search({childCare: true}, 0, 10).subscribe((data: any) => {
        this.posts = data;
      });
    } else if (param === 'senior-care') {
      this.jobPostingApiService.search({seniorCare: true}, 0, 10).subscribe((data: any) => {
        this.posts = data;
      });
    } else if (param === 'pet-care') {
      this.jobPostingApiService.search({petCare: true}, 0, 10).subscribe((data: any) => {
        this.posts = data;
      });
    } else if (param === 'housekeeping') {
      this.jobPostingApiService.search({housekeeping: true}, 0, 10).subscribe((data: any) => {
        this.posts = data;
      });
    }
  }

  getAllPosts() {
    this.jobPostingApiService.getAll().subscribe((data:any) => {
      this.posts = data;
    });
  }

  checkOverflow(element) {
    if (element.offsetHeight < element.scrollHeight) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.unSubscribeFromSubscription();
  }

  private unSubscribeFromSubscription(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

}
