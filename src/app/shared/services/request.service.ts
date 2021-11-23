import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AllDivisions } from "../entities/AllDivisions";
import { RequestData } from "../entities/request";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  url: string = "/ListSupportManagerPreferences/GetFamily";
  urlBase =  environment.api + "/ListSupportManagerPreferences";
  urlReq = environment.api + "/Request/";
  // url: string = '/ListSupportManagerPreferences/GetFamilyByFilter';

  constructor(private http: HttpClient) {}
  getAll(): Observable<RequestData[]> {
    return this.http.get<RequestData[]>(this.url);
  }
  getById(id: number): Observable<RequestData> {
    return this.http.get<RequestData>(`${this.url}/getById/${id}`);
  }
  add(o: RequestData) {
    return this.http.post(this.url, o);
  }
  update(o: RequestData) {
    return this.http.put(this.url, o);
  }
  getLastRequest(familyId: number) {
    return this.http.get<RequestData>(
      this.urlReq + `getLastRequest/${familyId}`
    );
  }
  GetLastAllDivision() {
    return this.http.get<AllDivisions>(
      this.urlReq + `GetLastAllDivision`
    );
  }
  getAllRequests(familyId: number) {
    return this.http.get<RequestData[]>(
      this.urlReq +  `getAllRequests/${familyId}`
    );
  }
  
  createRequst(requst) {
    return this.http.post<boolean>(this.urlReq + "/createRequst", requst);
  }
  UpdateRequst(requst) {
    return this.http.post<boolean>(this.urlReq + "/updateRequst", requst);
  }
}
