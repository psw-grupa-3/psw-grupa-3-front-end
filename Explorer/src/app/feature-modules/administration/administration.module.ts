import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProblemsComponent } from './problems/problems.component';
import { OverviewComponent } from './admin/overview.component';
import { AppRatingFormComponent } from './app-rating-form/app-rating-form.component';
import { AppRatingsComponent } from './app-ratings/app-ratings.component';
import { EquipmentRecordComponent } from './equipment-record/equipment-record.component';
import { FindPeopleComponent } from './find-people/find-people.component';
import { PublicRegistrationRequestsComponent } from './public-registration-requests/public-registration-requests.component';
import { BlogReportsComponent } from './blog-reports/blog-reports.component';

@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    ProfileComponent,
    ProfileFormComponent,
    ProblemsComponent,
    OverviewComponent,
    AppRatingFormComponent,
    AppRatingsComponent,
    EquipmentRecordComponent,
    FindPeopleComponent,
    PublicRegistrationRequestsComponent,
    BlogReportsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    ProfileFormComponent,
    ProfileComponent,
    FindPeopleComponent,
    ProblemsComponent,
    OverviewComponent,
    EquipmentRecordComponent,
    AppRatingsComponent,
    AppRatingFormComponent,
    BlogReportsComponent,
  ]
})
export class AdministrationModule { }
