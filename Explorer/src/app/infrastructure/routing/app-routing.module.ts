import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { ProblemFormComponent } from 'src/app/feature-modules/tour-authoring/problem-form/problem-form.component';
import { ProblemsComponent } from 'src/app/feature-modules/administration/problems/problems.component';
import { OverviewComponent } from 'src/app/feature-modules/administration/admin/overview.component';
import { BlogFormComponent } from 'src/app/feature-modules/blog/blog-form/blog-form.component';
import { PreferenceComponent } from 'src/app/feature-modules/marketplace/preference/preference.component';
import { TourReviewFormComponent } from 'src/app/feature-modules/tour-authoring/tour-review-form/tour-review-form.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { AppRatingsComponent } from 'src/app/feature-modules/administration/app-ratings/app-ratings.component';
import { AppRatingFormComponent } from 'src/app/feature-modules/administration/app-rating-form/app-rating-form.component';
import { EquipmentRecordComponent } from 'src/app/feature-modules/administration/equipment-record/equipment-record.component';
import { ClubComponent } from 'src/app/feature-modules/tour-authoring/club/club.component';
import { ClubInvitationFormComponent } from 'src/app/feature-modules/tour-authoring/club-invitation-form/club-invitation-form.component';
import { ClubInvitationsComponent } from 'src/app/feature-modules/tour-authoring/club-invitations/club-invitations.component';
import { MembershipRequestComponent } from 'src/app/feature-modules/tour-authoring/membership-request/membership-request.component';
import { ClubMembersComponent } from 'src/app/feature-modules/tour-authoring/club-members/club-members.component';
import {ObjectComponent} from "../../feature-modules/tour-authoring/object/object.component";
import { ShoppingCartComponent } from 'src/app/feature-modules/marketplace/shopping-cart/shopping-cart.component';
import {
  PositionSimulatorComponent
} from "../../feature-modules/tour-execution/position-simulator/position-simulator.component";
import { SearchResultsComponent } from 'src/app/feature-modules/marketplace/search-results/search-results.component';
import { FindPeopleComponent } from 'src/app/feature-modules/administration/find-people/find-people.component';
import { DetailedBlogComponent } from 'src/app/feature-modules/blog/detailed-blog/detailed-blog.component';
import { BlogsPageComponent } from 'src/app/feature-modules/blog/blogs-page/blogs-page.component';
import { PublicRegistrationRequestsComponent } from 'src/app/feature-modules/administration/public-registration-requests/public-registration-requests.component';
import { PurchasedToursComponent } from 'src/app/feature-modules/tour-execution/purchased-tours/purchased-tours.component';
import { ShowTourComponent } from 'src/app/feature-modules/marketplace/show-tour/show-tour.component';
import { AuthorsProblemsComponent } from '../../feature-modules/tour-authoring/authors-problems/authors-problems.component';
import { TouristsProblemsComponent } from 'src/app/feature-modules/tour-authoring/tourists-problems/tourists-problems.component';
import { CouponComponents } from 'src/app/feature-modules/marketplace/coupons/coupons.components';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'problem-form', component: ProblemFormComponent},
  {path: 'problems', component: ProblemsComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'blog-creation', component: BlogFormComponent, canActivate: [AuthGuard]},
  {path: 'preference', component: PreferenceComponent, canActivate: [AuthGuard]},
  {path: 'tour-review', component: TourReviewFormComponent},
  {path: 'tours', component: TourComponent, canActivate: [AuthGuard]},
  {path: 'app-ratings', component: AppRatingsComponent},
  {path: 'app-rating-form', component: AppRatingFormComponent},
  {path: 'equipment-record', component: EquipmentRecordComponent},
  {path: 'club', component: ClubComponent},
  {path: 'invitations', component: ClubInvitationFormComponent},
  {path: 'club-invitations', component: ClubInvitationsComponent},
  {path: 'membership-requests', component: MembershipRequestComponent},
  {path: 'club-members', component: ClubMembersComponent},
  {path: 'objects', component: ObjectComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'tour-execution-lifecycle', component: PositionSimulatorComponent},
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'find-people', component: FindPeopleComponent},
  {path: 'detailed-blog/:blogId', component: DetailedBlogComponent, canActivate: [AuthGuard]},
  {path: 'all-blogs', component: BlogsPageComponent},
  {path: 'public-registration-requests', component: PublicRegistrationRequestsComponent},
  {path: 'purchased-tours', component: PurchasedToursComponent},
  {path: 'show-tour/:tourId', component: ShowTourComponent},
  {path: 'authors-problems', component: AuthorsProblemsComponent},
  {path: 'tourists-problems', component: TouristsProblemsComponent},
  {path: 'coupons', component: CouponComponents}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
