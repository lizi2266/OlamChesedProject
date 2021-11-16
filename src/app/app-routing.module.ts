import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllDivisionsComponent } from "./all-divisions/all-divisions.component";
import { DivisionFamiliesComponent } from "./division-families/division-families.component";
import { GridGetSupportComponent } from "./grid-get-support/grid-get-support.component";
import { LoginComponent } from "./login/login.component";
import { SetDivisionsComponent } from "./set-divisions/set-divisions.component";
import { AuthGuardService } from "./shared/services/auth-guard.service";

const routes: Routes = [
    { path: "set-divisions", canActivate: [AuthGuardService], component: SetDivisionsComponent},
    { path: "grid-support", canActivate: [AuthGuardService], component: GridGetSupportComponent },
    { path: "division-families", canActivate: [AuthGuardService], component: DivisionFamiliesComponent },
    { path: "all-divisions", canActivate: [AuthGuardService], component: AllDivisionsComponent },

    
     
    { path: "login", component: LoginComponent },
    { path: '', pathMatch:"full", redirectTo:"grid-support"},

    { path: "**", pathMatch:"full", redirectTo:"grid-support"},

  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

