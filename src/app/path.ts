import { Routes } from "@angular/router";
import { AllDivisionsComponent } from "./all-divisions/all-divisions.component";
import { LoginComponent } from "./login/login.component";
import { RequestFormComponent } from "./request-form/request-form.component";
import { SetDivisionsComponent } from "./set-divisions/set-divisions.component";

export const arrayPath: Routes = [
      { 
            path: "login", component: LoginComponent
      },
      {
            path: "request-form", component: RequestFormComponent
      },
      {
            path: "set-divisions", component: SetDivisionsComponent
      },
      {
            path: "All-divisions", component: AllDivisionsComponent
      }
      



]

// , children: [
//                   {}]