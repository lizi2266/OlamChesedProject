import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AllDivisions } from "../shared/entities/AllDivisions";
import { AllDivisionsService } from "../shared/services/all-divisions.service";
import { ServiceService } from "../shared/services/service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  lastAllDivision: AllDivisions;
  constructor(private service: ServiceService,private route:Router,private AllDivisionsService:AllDivisionsService ) {}


  GetLastAllDivisionFromDB(){
    this.AllDivisionsService.GetLastAllDivision().subscribe(x => {
      this.lastAllDivision = x;
     });

  }
  ngOnInit() {
    this.GetLastAllDivisionFromDB();
    this.AllDivisionsService.lastDivision.subscribe((x) => {
      this.GetLastAllDivisionFromDB();
    });



    if (JSON.parse(localStorage.getItem("manager")) !== null) {
      this.isLogin = true;
    }
    this.service.userLogin.subscribe((x) => {
      if (x) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

  }
  logout(){

    localStorage.setItem('manager', null);
    this.service.userLogin.next(false);
    this.isLogin = false;
    this.route.navigateByUrl('login');
  }
}
