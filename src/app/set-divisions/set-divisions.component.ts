import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatListOption, MatSelectionList } from "@angular/material";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SendingMailComponent } from "../sending-mail/sending-mail.component";
import { SetRequestComponent } from "../set-request/set-request.component";
import { Divisions } from "../shared/entities/Divisions";
import { DivisionsWithFamilies } from "../shared/entities/DivisionsWithFamilies";
import { DivisionsPointsService } from "../shared/services/divisions-points.service";

@Component({
  selector: "app-set-divisions",
  templateUrl: "./set-divisions.component.html",
  styleUrls: ["./set-divisions.component.css"],
})
export class SetDivisionsComponent implements OnInit {
  //'רבי יהודה הנשיא 30', 'בן זכראי 15', 'התאנה 5', 'הריף 32', 'רמבם 18'
  divisions: Divisions[] = [];
  PointPlace: Divisions[] = [];
  Id: number;
  DivisionName: string;
  DivisionsAddress: string;
  Lat: string;
  Lng: string;
  
  form = this.fb.group({
    DivisionName: this.fb.control("", [Validators.required]),
    DivisionsAddress: this.fb.control("", [Validators.required]),
    Lat: this.fb.control("", [Validators.required]),
    Lng: this.fb.control("", [Validators.required]),
  });


  @ViewChild("searcha")
  public searchElementRef: ElementRef;
  address2Field: HTMLInputElement;
  autocomplete: google.maps.places.Autocomplete;
  divisionsWithFamilies:DivisionsWithFamilies[];
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  constructor(
    private rourer: Router,
    private fb: FormBuilder,
    private divisionsService: DivisionsPointsService,
    private dialog: MatDialog

  ) {}

  ngAfterViewInit() {
    this.address2Field = document.querySelector(
      "#ship-address"
    ) as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      {
        componentRestrictions: { country: ["ISR"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
      }
    );
    var self = this;
    //this.address2Field.focus();
    this.autocomplete.addListener("place_changed", () => {
      const place = this.autocomplete.getPlace();
      self.form.get('DivisionsAddress').setValue(self.searchElementRef.nativeElement.value)
    
      if (place.geometry && place.geometry.location) {
        self.form.patchValue({
          Lat: "" + place.geometry.location.lat(),
          Lng: "" + place.geometry.location.lng(),
          // "Address": ''+ place.address_components[2].long_name+' '+place.address_components[1].long_name+' '+place.address_components[0].long_name
        });
        //מס בניין 0- רחוב- 1 --עיר 2--- מיקומים באדרס קומפננט
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
      } else {
        Swal.fire("Ooops", "כתובת לא תקינה", "error");
      }
    });

    // AddDivisions( point:Divisions){

    // //Add to ls
    // localStorage.setItem(
    //   'pointPossion',
    //   JSON.stringify(this.PointPlace)
    // );
    // }
  }
  PlacingFamiliesIntoPoints() {
    var familyIds = localStorage.getItem("selectedFamilys");
    if (familyIds != null) {
      var ids = familyIds.split(",");
      this.divisionsService
        .PlacingFamiliesIntoDistributionPoints(ids)
        .subscribe((x) => {
           this.divisionsWithFamilies = x;
        }); 
    }
  }
  ngOnInit() {
    // this.selectionList.selectedOptions = new SelectionModel<MatListOption>(
    //   false
    // );
    this.getDivisions();
  }
  getDivisions() {
    this.divisionsService.getDivisions().subscribe((x) => {
      this.divisions = x;
    });
  }
  selectDivision(id) {
    var div = this.divisions.filter((x) => x.Id === id)[0];
    this.form = this.fb.group(div);
  }
  saveDivision() {
    this.divisionsWithFamilies =null;
    var div = <Divisions>this.form.value;
    if (div.Id && div.Id !== 0) {
      this.divisionsService.updateDivision(div).subscribe((x) => {
        if (x) {
          this.form = this.fb.group({
            DivisionName: this.fb.control("", [Validators.required]),
            DivisionsAddress: this.fb.control("", [Validators.required]),
            Lat: this.fb.control("", [Validators.required]),
            Lng: this.fb.control("", [Validators.required]),
          });
          this.getDivisions();
          Swal.fire("", " השמירה בוצעה בהצלחה, יש ללחוץ על שיבוץ מחדש להחיל שינויים", "info");
        } else {
          Swal.fire("Oooops", "ארעה שגיאה במהלך השמירה", "error");
        }
      });
    } else {
      this.divisionsService.addDivision(div).subscribe((x) => {
        if (x) {
          this.getDivisions();
          this.form = this.fb.group({
            DivisionName: this.fb.control("", [Validators.required]),
            DivisionsAddress: this.fb.control("", [Validators.required]),
            Lat: this.fb.control("", [Validators.required]),
            Lng: this.fb.control("", [Validators.required]),
          });
          Swal.fire("", "השמירה בוצעה בהצלחה", "success");
        } else {
          Swal.fire("Oooops", "ארעה שגיאה במהלך השמירה", "error");
        }
      });
    }
  }
    enterMesseg(){

      this.divisionsService.sendMailToFamily().subscribe(x=>{
        Swal.fire('', 'השליחה בוצעה בהצלחה', 'success');
             });
      // const dialogRef = this.dialog.open(SendingMailComponent, {
       
      //   // data: { FamilyId },
      // });
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
      // });
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log("The dialog was closed");
      //   // this.sortData();
      // });
    
      // alert(this.divisionsWithFamilies[0].Division.DivisionsAddress)

    
  }
}
