import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {ChildCareComponent} from './pages/child-care/child-care.component';
import {SeniorCareComponent} from './pages/senior-care/senior-care.component';
import {PetCareComponent} from './pages/pet-care/pet-care.component';
import {HousekeepingComponent} from './pages/housekeeping/housekeeping.component';
import {HttpClientModule} from '@angular/common/http';
import {UserComponent} from './auth/user/user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CategoriesSelectComponent} from './pages/shared/categories-select/categories-select.component';
import {ListingsComponent} from './pages/listings/listings.component';
import {WorkerProfileComponent} from './pages/worker-profile/worker-profile.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ToastrModule} from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import { JobPostingComponent } from './pages/job-posting/job-posting.component';
import { JobsComponent } from './pages/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChildCareComponent,
    SeniorCareComponent,
    PetCareComponent,
    HousekeepingComponent,
    UserComponent,
    CategoriesSelectComponent,
    ListingsComponent,
    WorkerProfileComponent,
    JobPostingComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar: true,
      maxOpened: 10,
      tapToDismiss: true,
      newestOnTop: true
    }),
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
