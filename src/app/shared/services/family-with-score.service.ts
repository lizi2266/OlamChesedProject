import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyWithScore } from '../entities/FamilyWithScore';
import { FamilyDetails } from '../entities/familyDetails';
@Injectable({
  providedIn: 'root'
})
export class FamilyWithScoreService {
 

  url2 = "/api/FamilyDetails";
  url: string = '/api/ListSupportManagerPreferences/GetFamily';
  urlBase = 'https://localhost:44318/api/ListSupportManagerPreferences';
  constructor(private http: HttpClient) { }

  getAll() {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.get<FamilyWithScore[]>(this.url);
  }
  getAllByFilter(first: number,second:number,third:number, fourth:number,filterId:number ) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.get<FamilyWithScore[]>(this.urlBase + '/GetFamilyByFilter/'+ first +'/'+second+'/'+third+'/'+ fourth+'/'+filterId );
   
   
    // https://material.angular.io/components/select/overview
  }
  getFamiliesByIds(ids:string[] ) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.post<FamilyDetails[]>(this.urlBase + '/getFamiliesByIds',ids );
   
   
    // https://material.angular.io/components/select/overview
  }
  ApproveFamiliesRequest(ids:string[] ) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.post<boolean>(this.urlBase + '/ApproveFamiliesRequest',ids );
   
   
    // https://material.angular.io/components/select/overview
  }
  getFamilyById(familyId: any) {
    return this.http.get<FamilyDetails>(this.urlBase + '/getFamilyById/'+familyId );
   
   
  }

  createFamily(family){
    return this.http.post<boolean>(this.urlBase + '/createFamily',family );
   
  }
  UpdateFamily(family){
    return this.http.post<boolean>(this.urlBase + '/updateFamily',family );
   
  }
  
}
