import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../api/authentication.service';
import {Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalApiService} from '../../api/professional-api.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {
  public createProfileForm: FormGroup;
  public workerProfile: boolean;
  public workerProfileData: any;
  private isLoginFinishedSubscription: Subscription;
  public editMode: boolean = false;
  public profileToBeEdited: any = null;
  isChecked = true;

  constructor(public authenticationService: AuthenticationService,
              public router: Router, private fb: FormBuilder,
              private professionaleService: ProfessionalApiService,
              public toastrService: ToastrService) {
    this.createProfileForm = fb.group({
      'name': [null, Validators.required],
      'surname': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'city': [null, Validators.required],
      'childCare': [null, Validators.required],
      'seniorCare': [null, Validators.required],
      'petCare': [null, Validators.required],
      'housekeeping': [null, Validators.required],
      'description': [null, Validators.required],
      'visible': [null, Validators.required],
      'age': [null, Validators.required],
      'gender': [null, Validators.required],

    });
  }

  ngOnInit(): void {
    this.isLoginFinishedSubscription = this.authenticationService.isLoginFinished.subscribe((finished: boolean) => {
      if (finished) {
        if (!this.authenticationService.isLoggedIn) {
          this.router.navigate(['/']);
        }
        this.checkIfProfileExists();
      }
    });
  }

  checkIfProfileExists() {
    if (this.authenticationService.userData) {
      this.professionaleService.search({'userId': this.authenticationService.userData._id}, 0, 1).subscribe((data: any) => {
        if (data != null && data.length !== 0) {
          this.workerProfile = true;
          this.workerProfileData = data;
          console.log(this.workerProfileData);
        } else {
          this.workerProfile = false;
        }
      });
    }

  }

  createProfile(post) {
    if (this.profileToBeEdited == null) {
      post.email = this.authenticationService.userData.email;
      post.userId = this.authenticationService.userData._id;
      this.professionaleService.add(post).subscribe(data => {
        console.log(data);
        this.toastrService.success('Profili u krijuar me sukses');
        this.professionaleService.search({'userId': this.authenticationService.userData._id}, 0, 1).subscribe((data: any) => {
          if (data != null && data.length !== 0) {
            this.workerProfileData = data;
            this.workerProfile = true;
          }
        });
      });
    } else {
    post._id = this.profileToBeEdited[0]._id;
    console.log(post)
      this.professionaleService.update(post).subscribe(data => {
        console.log(data);
        this.professionaleService.search({'userId': this.authenticationService.userData._id}, 0, 1).subscribe((data: any) => {
          if (data != null && data.length !== 0) {
            this.workerProfileData = data;
            this.editMode = false;
          }
        });
        this.toastrService.success('Profili u editua me sukses');
      });
    }

  }

  ngOnDestroy(): void {
    this.unSubscribeFromSubscription();
  }

  private unSubscribeFromSubscription(): void {
    if (this.isLoginFinishedSubscription) {
      this.isLoginFinishedSubscription.unsubscribe();
    }
  }

  editProfile(workerProfile) {
    this.editMode = true;
    this.profileToBeEdited = workerProfile;
    this.isChecked = workerProfile[0].visible;
    this.createProfileForm.patchValue({
      'name': workerProfile[0].name,
      'surname': workerProfile[0].surname,
      'phoneNumber': workerProfile[0].phoneNumber,
      'city': workerProfile[0].city,
      'description': workerProfile[0].description,
      'visible': workerProfile[0].visible,
      'childCare': workerProfile[0].childCare,
      'seniorCare': workerProfile[0].seniorCare,
      'petCare': workerProfile[0].petCare,
      'housekeeping': workerProfile[0].housekeeping,
      'age': workerProfile[0].age,
      'gender': workerProfile[0].gender,
    });
  }
  cancelEdit() {
    this.editMode = false;
  }
}
