import {Component} from '@angular/core';
import {AuthenticationService} from './api/authentication.service';
import {trigger, transition, animate, style, query, group} from '@angular/animations';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animRoutes', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class AppComponent {
  title = 'dado-project';

  constructor(public authenticationService: AuthenticationService,public route: ActivatedRoute) {
    authenticationService.tryAuthenticationFromCookie();
  }
  animationState: number;

  onActivate($event) {
    this.animationState = this.route.firstChild.snapshot.data['routeIdx'];
  }
}
