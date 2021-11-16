import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AllDivisions } from "../entities/AllDivisions";
import { FamilyDetails } from "../entities/familyDetails";
import { FamilyDetailsService } from "./family-details.service";

@Injectable({
  providedIn: 'root'
})
export class AllDivisionsService {
  url: string = environment.api + "/api/AllDivisions/";
  lastDivision = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  GetAllDivisions(){
    return this.http.get<AllDivisions[]>(this.url + 'getAllDivisions');

  }
  GetLastAllDivision(){
    return this.http.get<AllDivisions>(this.url + 'GetLastAllDivision');

  }
  GetFamiliesByAllDivisionId(AllDivisionsId:number){
    return this.http.get<FamilyDetails[]>(this.url + `GetFamiliesByAllDivisionId/${AllDivisionsId}`);

  }

  UpdateAllDivision(allD: AllDivisions){
    return this.http.post<boolean>(this.url + 'UpdateAllDivision',allD);
  }

  CloseAllDivision(){
    return this.http.get <boolean> (this.url + 'CloseAllDivision');
  }
}