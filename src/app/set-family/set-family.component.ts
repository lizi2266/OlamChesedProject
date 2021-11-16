import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FamilyWithScoreService } from '../shared/services/family-with-score.service';
import { FamilyDetails } from '../shared/entities/familyDetails';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-family',
  templateUrl: './set-family.component.html',
  styleUrls: ['./set-family.component.css']
})
export class SetFamilyComponent implements OnInit {


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SetFamilyComponent>,
    private familyWithScoreService: FamilyWithScoreService) { }

  family: FamilyDetails;
  address1Field: HTMLInputElement;

  autocomplete: google.maps.places.Autocomplete;
  form = this.fb.group({
    // Id: this.fb.control("0", [Validators.required]),
    LastName: this.fb.control("", [Validators.required]),
    HusbandName: this.fb.control("",),
    HusbandIdentity: this.fb.control("", [Validators.pattern("^[0-9]*$")]),
    HusbandBirthday: this.fb.control("",),
    WifeName: this.fb.control("",),
    WifeId: this.fb.control("", [Validators.pattern("^[0-9]*$")]),
    WifeBirthday: this.fb.control("",),
    Sector: this.fb.control("", [Validators.required]),
    FamilyStatus: this.fb.control("", [Validators.required]),
    NumberChildren: this.fb.control("", [Validators.required]),
    Address: this.fb.control("", [Validators.required]),
    NumFloor: this.fb.control("",),
    ApartmentNumber: this.fb.control("",),
    Phone: this.fb.control("",),
    PhoneHusband: this.fb.control("",),
    PhoneWife: this.fb.control("",),
    Lng: this.fb.control("", [Validators.required]),
    Lat: this.fb.control("", [Validators.required]),
    Mail: this.fb.control("", Validators.compose([Validators.required, Validators.email])),
    // ModeId:this.fb.control("", ),
    // CommunityId:this.fb.control("", ),      
    // DivisionId:this.fb.control("",), 
    Password: this.fb.control("", [Validators.required]),
    // IsAccepted:this.fb.control("", [Validators.required]),
    IncomePerCapita: this.fb.control("", [Validators.required]),
  });
  @ViewChild('searcha')
  public searchElementRef: ElementRef;
  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      componentRestrictions: { country: ["ISR"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });

    var self = this;
    this.autocomplete.addListener("place_changed", () => {
      const place = this.autocomplete.getPlace();
      self.form.get('Address').setValue(self.searchElementRef.nativeElement.value)
      if (place.geometry && place.geometry.location) {

        self.form.patchValue({
          "Lat": '' + place.geometry.location.lat(),
          "Lng": '' + place.geometry.location.lng(),
          // "Address": ''+ place.address_components[2].long_name+' '+place.address_components[1].long_name+' '+place.address_components[0].long_name 
        });
        //מס בניין 0- רחוב- 1 --עיר 2--- מיקומים באדרס קומפננט
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.

      }
      else {
        Swal.fire('Ooops', 'כתובת לא תקינה', 'error')
      }
    });
  }

  ngOnInit() {
    if (this.data && this.data.familyId) {
      this.familyWithScoreService.getFamilyById(this.data.familyId).subscribe((response) => {
        this.form = this.fb.group(response);

        this.form.patchValue({
          // "Id":''+response.Id,
          "LastName": '' + (!response.LastName?'':response.LastName),
          "Mail": '' + (!response.Mail ? '123@example.com':response.Mail),
          "Password": '' + response.Password,
          "HusbandName": '' +(! response.HusbandName ? '':response.HusbandName),
          "HusbandIdentity":(! response.HusbandIdentity? '':response.HusbandIdentity),
          "HusbandBirthday": '' + (! response.HusbandBirthday? '': new Date(new Date(response.HusbandBirthday).setHours(3)).toISOString().substring(0, 10))
         ,
          "WifeName": '' + (!response.WifeName? '':response.WifeName),
          "WifeId": (!response.WifeId ? '':response.WifeId),
          "WifeBirthday": (! response.WifeBirthday? '': new Date(new Date(response.WifeBirthday).setHours(3)).toISOString().substring(0, 10))
          ,         "Sector": '' + (!response.Sector ? '':response.Sector),
          "FamilyStatus": '' + (!response.FamilyStatus ? '':response.FamilyStatus ),
          "NumberChildren": '' + (!response.NumberChildren ? 0:response.NumberChildren),
          "NumFloor": '' + (!response.NumFloor ? 0:response.NumFloor),
          "ApartmentNumber": '' + (!response.ApartmentNumber ? '':response.ApartmentNumber) ,
          "Phone": '' + (!response.Phone ? '':('0'+response.Phone)),
          "PhoneHusband": '' + (!response.PhoneHusband ? '':('0'+response.PhoneHusband)),
          "PhoneWife": '' + (!response.PhoneWife ? '':('0'+response.PhoneWife)
          ),
          "IncomePerCapita": '' + (!response.IncomePerCapita ? 0: response.IncomePerCapita),
          "Address": '' + response.Address
        });
      });

    }
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
      // { data: "Order" }
    }
  }
  save() {
    const family = <FamilyDetails>this.form.value;
    family.WifeBirthday = new Date(family.WifeBirthday);
    family.HusbandBirthday = new Date(family.HusbandBirthday);
    console.log(family)
    if (!this.data || !this.data.familyId) {
      this.familyWithScoreService.createFamily(family).subscribe((x) => {
        Swal.fire('','השמירה בוצעה בהצלחה!','success');
        this.close();
      });
    } else {
      this.familyWithScoreService.UpdateFamily(family).subscribe((x) => {
        Swal.fire('','השמירה בוצעה בהצלחה!','success');
        this.close();
      });
    }
  }
}
