import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../api/authentication.service';
import {JobPostingApiService} from '../../api/job-posting-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent implements OnInit {

  public createPostForm: FormGroup;

  constructor(private fb: FormBuilder,
              public authenticationService: AuthenticationService,
              private jobPostingApiService: JobPostingApiService,
              public toastrService: ToastrService) {
    this.createPostForm = fb.group({
      'city': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'childCare': [null, Validators.required],
      'seniorCare': [null, Validators.required],
      'petCare': [null, Validators.required],
      'housekeeping': [null, Validators.required],
      'description': [null, Validators.required],
      'title': [null, Validators.required]
    });
  }

  public areas: any[] = ['Lushnje', 'Tirana', 'Fier', 'Gjirokaster', 'Sarande'];


  ngOnInit(): void {

  }

  createPost(body) {
    body.email = this.authenticationService.userData.email;
    body.userId = this.authenticationService.userData._id;
    this.jobPostingApiService.add(body).subscribe(data => {
      console.log(data);
      this.toastrService.success('Prostimi u krijuar me sukses');
    });

  }

}
