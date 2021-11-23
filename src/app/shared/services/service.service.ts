import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Manager } from '../entities/Manager';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = environment.api + '/manager/';
  userLogin = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  login(manager: Manager) {
    return this.http.post<Manager>(this.url + 'login', manager);
  }
}
