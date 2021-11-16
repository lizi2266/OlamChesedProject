import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';



import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MAT_DATE_LOCALE,
  MatCheckboxModule,
  MatRippleModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
// import { AgmCoreModule } from '@agm/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/login/login.component';
import { RequestFormComponent } from '../app/request-form/request-form.component';
import { arrayPath } from "src/app/path";
import { RouterModule } from "@angular/router";
import { BasicDetailesComponent } from '../app/basic-detailes/basic-detailes.component';
import { AppMapComponent } from '../app/app-map/app-map.component';
import { AutoComplitGoogleComponent } from '../app/auto-complit-google/auto-complit-google.component';
import { GridGetSupportComponent } from '../app/grid-get-support/grid-get-support.component';
// import { FamilyDetailsTableComponent } from './family-details-table/family-details-table.component';
import { error } from 'selenium-webdriver';
import { SetFamilyComponent } from './set-family/set-family.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SetDivisionsComponent } from './set-divisions/set-divisions.component';
import { FamiliesComponent } from './families/families.component';
import { SetRequestComponent } from './set-request/set-request.component';
import { DivisionFamiliesComponent } from './division-families/division-families.component';
import { SendingMailComponent } from './sending-mail/sending-mail.component';
import { AllDivisionsComponent } from './all-divisions/all-divisions.component';
import { SetAllDivisionsComponent } from './set-all-divisions/set-all-divisions.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ViewHistoryRequestsComponent } from './view-history-requests/view-history-requests.component';
// import {MatPaginator} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    // FamilyDetailsTableComponent,
    LoginComponent,
    RequestFormComponent,
    BasicDetailesComponent,
    AppMapComponent,
    AutoComplitGoogleComponent,
    GridGetSupportComponent,  
    SetFamilyComponent, HeaderComponent, SetDivisionsComponent, FamiliesComponent, SetRequestComponent,
     DivisionFamiliesComponent, SendingMailComponent, SetAllDivisionsComponent,AllDivisionsComponent, ViewHistoryRequestsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // AppRoutingModule,/////
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatRippleModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatRadioModule,
    // MatPaginator,
    RouterModule.forRoot(arrayPath),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDg_fs6G0L7ZaEzZFWIX4N4ZISkiKCCnhQ',
    //   libraries: ['places']
    // }),
    // // MatGoogleMapsAutocompleteModule,
    // AgmCoreModule.forRoot()
  ],
  entryComponents: [SetFamilyComponent,SetRequestComponent,SendingMailComponent,ViewHistoryRequestsComponent],

  providers: [ AuthGuardService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {  provide: MAT_DATE_LOCALE, useValue: 'he-IL'}, 
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
