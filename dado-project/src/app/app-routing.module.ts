import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ChildCareComponent} from './pages/child-care/child-care.component';
import {SeniorCareComponent} from './pages/senior-care/senior-care.component';
import {PetCareComponent} from './pages/pet-care/pet-care.component';
import {HousekeepingComponent} from './pages/housekeeping/housekeeping.component';
import {CategoriesSelectComponent} from './pages/shared/categories-select/categories-select.component';
import {UserComponent} from './auth/user/user.component';
import {ListingsComponent} from './pages/listings/listings.component';
import {WorkerProfileComponent} from './pages/worker-profile/worker-profile.component';
import {JobPostingComponent} from './pages/job-posting/job-posting.component';
import {JobsComponent} from './pages/jobs/jobs.component';

const routes: Routes = [
  { path: 'child-care', component: ChildCareComponent, data: { routeIdx: 0 } },
  { path: 'senior-care', component: SeniorCareComponent, data: { routeIdx: 1 }},
  { path: 'pet-care', component: PetCareComponent, data: { routeIdx: 2 }},
  { path: 'housekeeping', component: HousekeepingComponent, data: { routeIdx: 3 }},
  { path: 'category-select', component: CategoriesSelectComponent, data: { routeIdx: 5 }},
  { path: 'worker-profile', component: WorkerProfileComponent},
  { path: 'user/:action', component: UserComponent},
  { path: 'listings/:action', component: ListingsComponent},
  { path: 'job-posting', component: JobPostingComponent},
  { path: 'jobs/:action', component: JobsComponent},
  { path: '**', component: HomeComponent, data: { routeIdx: 4 } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
