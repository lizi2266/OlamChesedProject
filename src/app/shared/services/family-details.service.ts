import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FamilyDetails } from '../entities/familyDetails';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {

  url: string = environment.api +'/ListSupportManagerPreferences/GetFamilyByFilter';
  url1 = environment.api + '/CreateFamily/';
  form: any;
  service: any;
  rourer: any;

   constructor(private http: HttpClient) { }
   //CreateFamily
   save() {
    var family = <FamilyDetails>this.form.value;
    // family.Id = 0;
    this.service.save(family).subscribe(x => {
      if (!x) {
        Swal.fire('Oooops', "אחד או יותר מהנתונים שהזנתם שגוי", 'error');
      }
      else {
        Swal.fire('', 'נוסף בהצלחה למערכת', 'success');
        localStorage.setItem('family', JSON.stringify(x));
        //TODO header - user
        this.rourer.navigate(["UpdateFamily"]);
      }
               return this.http.post<FamilyDetails>(this.url1 + '/grid-support/UpdateFamily', family);
}
       );
      
       }

getAll(){
  // let headers = new HttpHeaders()
  // headers.append("Content-Type", "application/json")
  // headers.append("projectid", "Tripop")
  return this.http.get(this.url);
}
//   getAll(): Observable<FamilyDetails[]> {
// console.log(1);
// return this.http.get<FamilyDetails[]>(this.url);

    // return this.http.get<FamilyDetails[]>(this.url);
  }
  // getById(id: number): Observable<FamilyDetails> {
  //   return this.http.get<FamilyDetails>(`${this.url}/getById/${id}`);
  // }
  // add(o: FamilyDetails) {
  //   return this.http.post(this.url, o);
  // }
  // update(o: FamilyDetails) {
  //   return this.http.put(this.url, o);
  // }
