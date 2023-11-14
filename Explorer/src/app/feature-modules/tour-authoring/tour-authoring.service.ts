import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Tour } from './model/tour.model';
import { Problem } from './model/problem.model';
import {PagedResults} from "../../shared/model/paged-results.model";
import {Point} from "./model/points.model";
import { TourReview } from './model/tourReview.model';
import { Club } from './model/club.model';
import { ClubInvitation } from './model/clubInvitation.model';
import { MembershipRequest } from './model/membership-request.model';
import { ClubMember } from './model/clubMember.model';
import {Object} from "./model/object.model";

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }

  getPoints(): Observable<PagedResults<Point>>{
    return this.http.get<PagedResults<Point>>(environment.apiHost + 'author/points');
  }

  deletePoints(id: number | undefined): Observable<Point> {
    return this.http.delete<Point>(environment.apiHost + 'author/points/' + id);
  }

  addPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(environment.apiHost + 'author/points',point);
  }

  updatePoint(point: Point): Observable<Point> {
      return this.http.put<Point>(environment.apiHost + 'author/points/' + point.id, point);
  }

  setPublicPoint(id: number, pointName: string): Observable<Tour> {
    return this.http.patch<Tour>(environment.apiHost + 'author/tour/publishPoint/' + id + '?pointName=' + pointName, {});
  }

  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'author/tour/getAll');
  }

  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'author/tour/' + id);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(environment.apiHost + 'author/tour', tour);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(environment.apiHost + 'author/tour/' + tour.id, tour);
  }

  addTourReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview', tourReview);
  }

  getTourReviews(): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(environment.apiHost + 'tourist/tourReview');
  }

  addClub(club: Club) : Observable<Club>{
    return this.http.post<Club>(environment.apiHost + 'club', club)
  }

  getClubs() : Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'club/getAll')
  }

  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'club/' + club.id, club);
  }

  addClubInvitation(clubInvitation: ClubInvitation): Observable<ClubInvitation>{
    return this.http.post<ClubInvitation>(environment.apiHost + 'tourist/clubInvitation', clubInvitation);
  }

  getClubInvitations(): Observable<PagedResults<ClubInvitation>> {
    return this.http.get<PagedResults<ClubInvitation>>(environment.apiHost + 'tourist/clubInvitation/getAll')
  }


  deleteClubInvitation(id: number): Observable<ClubInvitation> {
    return this.http.delete<ClubInvitation>(environment.apiHost + 'tourist/clubInvitation/' + id);
  }

   addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(environment.apiHost + 'tourist/problem', problem);
  }

  createMembershipRequest(membershipRequest:MembershipRequest){
    return this.http.post<MembershipRequest>(environment.apiHost + 'membershipRequests', membershipRequest);
  }

  getAllMembershipRequests (){
    return this.http.get<PagedResults<MembershipRequest>>(environment.apiHost + 'membershipRequests/getAll')
  }

  acceptMembershipRequest (membershipRequest:MembershipRequest){
    console.log(membershipRequest);
    return this.http.put<MembershipRequest>(environment.apiHost + 'membershipRequests/accept/' + membershipRequest.id, membershipRequest)
  }

  rejectMembershipRequest (membershipRequest:MembershipRequest){
    return this.http.put<MembershipRequest>(environment.apiHost + 'membershipRequests/reject/' + membershipRequest.id, membershipRequest)
  }

  getClubMembers(): Observable<PagedResults<ClubMember>> {
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + 'tourist/clubMember/getAll')
  }


  deleteClubMember(id: number): Observable<ClubMember> {
    return this.http.delete<ClubMember>(environment.apiHost + 'tourist/clubMember/' + id);
  }

  getPointsForTour(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + `author/points/getAllForTour/${id}`);
  }

  getObjects(): Observable<PagedResults<Object>>{
    return this.http.get<PagedResults<Object>>(environment.apiHost + 'author/objects');
  }

  deleteObjects(id: number | undefined): Observable<Object> {
    return this.http.delete<Object>(environment.apiHost + 'author/objects/' + id);
  }

  addObject(object: Object): Observable<Object> {
    return this.http.post<Object>(environment.apiHost + 'author/objects',object);
  }

  updateObject(object: Object): Observable<Object> {
    return this.http.put<Object>(environment.apiHost + 'author/objects/' + object.id, object);
  }

  setPublicObject(id: number): Observable<Object> {
    return this.http.patch<Object>(environment.apiHost + 'author/objects/setPublic/' + id, {});
  }

  getAverageRating(tourId: number): Observable<number> {
    return this.http.get<number>(environment.apiHost + 'tourist/tourReview/average-rating/' + tourId)
  }

  arhiveTour(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'author/tour/arhiveTour/' + id);
  }

  publishTour(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'author/tour/publishTour' + id);
  }
}

