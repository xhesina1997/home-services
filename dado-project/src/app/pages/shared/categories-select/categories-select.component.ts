import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserApiService} from '../../../api/user-api.service';
import {AuthenticationService} from '../../../api/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent implements OnInit {
  public action: string;
  private paramsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userApiService: UserApiService,
    private router: Router) {
  }

  ngOnInit(): void {

  }

}
