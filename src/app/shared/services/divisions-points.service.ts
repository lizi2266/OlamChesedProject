import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Divisions } from "../entities/Divisions";
import { DivisionsWithFamilies } from "../entities/DivisionsWithFamilies";

@Injectable({
  providedIn: "root",
})
export class DivisionsPointsService {
  url: string = environment.api + "/api/Division/";

  constructor(private http: HttpClient) {}

  getDivisions() {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.get<Divisions[]>(this.url + 'getAllDivisions');
  }
  getDivisionById(id) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.get<Divisions[]>(this.url + 'getDivisionById/'+id);
  }
  addDivision(div:Divisions) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.post<boolean>(this.url + 'addDivision',div);
  }
  updateDivision(div:Divisions) {
    // let headers = new HttpHeaders()
    // headers.append("Content-Type", "application/json")
    // headers.append("projectid", "Tripop")
    return this.http.post<boolean>(this.url + 'updateDivision',div);
  } 

  PlacingFamiliesIntoDistributionPoints(ids){

    return this.http.post<DivisionsWithFamilies[]>(this.url + 'PlacingFamiliesIntoDistributionPoints',ids);
  }


  sendMailToFamily(){
    
    return this.http.get<boolean>(this.url + 'sendMail');
  }
}
