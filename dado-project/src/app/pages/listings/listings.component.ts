import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserApiService} from '../../api/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../api/authentication.service';
import {ProfessionalApiService} from '../../api/professional-api.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  public action: string;
  private paramsSubscription: Subscription;
  public filteredData: any [] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private professionalApiService: ProfessionalApiService
  ) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.action = params.action;
      this.getFilteredData(params.action);
    });
  }

  getFilteredData(param) {
    if (param === 'child-care') {
      this.professionalApiService.search({childCare: true}, 0, 10).subscribe((data: any) => {
        this.filteredData = data;
      });
    } else if (param === 'senior-care') {
      this.professionalApiService.search({seniorCare: true}, 0, 10).subscribe((data: any) => {
        this.filteredData = data;
      });
    } else if (param === 'pet-care') {
      this.professionalApiService.search({petCare: true}, 0, 10).subscribe((data: any) => {
        this.filteredData = data;
      });
    } else if (param === 'housekeeping') {
      this.professionalApiService.search({housekeeping: true}, 0, 10).subscribe((data: any) => {
        this.filteredData = data;
      });
    }

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
