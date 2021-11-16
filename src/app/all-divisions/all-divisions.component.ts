import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllDivisions } from '../shared/entities/AllDivisions';
// import { DTO_AllDivisions } from '../shared/entities/AllDivisions';
import { FamilyDetails } from '../shared/entities/familyDetails';
import { AllDivisionsService } from '../shared/services/all-divisions.service';
import { FamilyDetailsService } from '../shared/services/family-details.service';

export class data {
  position: number;
  Id: number;
  LastName: string;
  HusbandName: string;
  HusbandIdentity: number;
  // HusbandBirthday:Date;
  WifeName: string;
  // WifeId:string;
  // WifeBirthday:Date;
  // Sector:string;
  FamilyStatus: string; //1
  NumberChildren: number; //2
  Address: string;
  // BuildingNumber:number;
  // NumFloor:number;
  // ApartmentNumber:number;
  // phone:number;
  // phoneHusband:number;
  // PhoneWife:number;
  // Lng:string;
  // Lat:string;
  // Mail:string;
  IsAccepted: boolean; //3
  IncomePerCapita: number; //4  
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-all-divisions',
  templateUrl: './all-divisions.component.html',
  styleUrls: ['./all-divisions.component.css']
})

export class AllDivisionsComponent implements OnInit {
  // AllDivisions1:DTO_AllDivisions[];
  AllDivisions1: AllDivisions[];



  form = this.fb.group({
    // Id: this.fb.control("0", [Validators.required]),
    AllDivisionsName: this.fb.control("", [Validators.required]),
    AllDivisionsDate: this.fb.control("", [Validators.required]),
    AlldivisionsRemarks: this.fb.control("", [Validators.required]),


  });


  element_data = [];
  displayedColumns: string[] =
    [
      "LastName",
      "HusbandName",
      "WifeName",
      "FamilyStatus",
      "NumberChildren",
      "IncomePerCapita",
      "Address"
    ];

  dataSource: MatTableDataSource<FamilyDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private familyDetailsService: FamilyDetailsService,
    private AllDivisionsService: AllDivisionsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: Router
  ) { }

  selectedValue: string;
  familyDetails_arr: FamilyDetails[];

  GetLastAllDivisionFromDB() {
    this.AllDivisionsService.GetLastAllDivision().subscribe(x => {
      this.form = this.fb.group(x);

      this.form.patchValue({
        "AllDivisionsDate": (!x.AllDivisionsDate ? '' : new Date(new Date(x.AllDivisionsDate).setHours(3)).toISOString().substring(0, 10))

      });
    });
  }


  ngOnInit() {
    this.AllDivisionsService.GetAllDivisions().subscribe(x => {
      this.AllDivisions1 = <AllDivisions[]>x;
    });
    this.GetLastAllDivisionFromDB();
  }
  saveAllDivision() {

    const allD = <AllDivisions>this.form.value;
    allD.AllDivisionsDate = new Date(allD.AllDivisionsDate);

    this.AllDivisionsService.UpdateAllDivision(allD).subscribe((x) => {
      Swal.fire('', 'השמירה בוצעה בהצלחה!', 'success');
      this.AllDivisionsService.lastDivision.next(true);


    });

  }
  selectAllDivision(AllDivisionsID: number) {

    this.AllDivisionsService.GetFamiliesByAllDivisionId(AllDivisionsID).subscribe(x => {
      this.familyDetails_arr = x;
      this.dataSource = new MatTableDataSource(this.familyDetails_arr);
      this.dataSource.paginator = this.paginator;
    });
  }
  closeAllDivision() {
    localStorage.setItem("selectedFamilys", null);


    this.AllDivisionsService.CloseAllDivision().subscribe((x) => {

      this.AllDivisionsService.lastDivision.next(true);
      this.GetLastAllDivisionFromDB();
      Swal.fire('', 'השמירה בוצעה בהצלחה!', 'success');

    });


  }
}
