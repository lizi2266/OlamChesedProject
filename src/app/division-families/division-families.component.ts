import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { FamilyDetails } from "../shared/entities/familyDetails";
import { FamilyDetailsService } from "../shared/services/family-details.service";
import { FamilyWithScoreService } from "../shared/services/family-with-score.service";

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
  // Street:string;
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

@Component({
  selector: "app-division-families",
  templateUrl: "./division-families.component.html",
  styleUrls: ["./division-families.component.css"],
})
export class DivisionFamiliesComponent implements OnInit {
  familyDetails_arr_ids: string[];
  familyDetails_arr: FamilyDetails[];
  element_data = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    "LastName",
    "HusbandName",
    "WifeName",
    "FamilyStatus",
    "NumberChildren",
    "IncomePerCapita",
    "Address",
    "Action",
  ];

  dataSource: MatTableDataSource<FamilyDetails>;
  selection = new SelectionModel<FamilyDetails>(true, []);

  constructor(
    private familyWithScoreService: FamilyWithScoreService,
    private dialog: MatDialog,
    private dia: MatDialog,
    private route:Router
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFamilys() {
    const familysIds = this.selection.selected.map((x) => x.Id).join(",");
    const familys = this.selection.selected;
    localStorage.setItem("selectedFamilys", familysIds);
  }
  RemoveFamily(id) {


    var familyIds = localStorage.getItem("selectedFamilys");
    if (familyIds != null) {
      var ids = familyIds.split(",");
      const index = ids.indexOf(''+id, 0);
      if (index > -1) {
        ids.splice(index, 1);
        localStorage.setItem("selectedFamilys", ids.join(","));
        this.getFamiliesByIdsList(ids);
      }
    }
  }
  getFamiliesByIds() {
    var familyIds = localStorage.getItem("selectedFamilys");
    if (familyIds != null) {
      var ids = familyIds.split(",");
      this.getFamiliesByIdsList(ids);
    }
  }
  getFamiliesByIdsList(ids) {
    this.familyWithScoreService.getFamiliesByIds(ids).subscribe((res) => {
      this.familyDetails_arr = <FamilyDetails[]>res;
      this.dataSource = new MatTableDataSource(this.familyDetails_arr);
      this.dataSource.paginator = this.paginator;
    });
  }
  closeListSupoort() {
    var familyIds = localStorage.getItem('selectedFamilys');
    if (familyIds != null) {
      var ids = familyIds.split(',');
      this.familyWithScoreService.ApproveFamiliesRequest(ids).subscribe(res => 
        {
this.route.navigateByUrl('set-divisions');
        });
      }
  }

  ngOnInit() {}
  create_data() {
    for (let i = 0; i < this.familyDetails_arr_ids.length; i++) {
      this.element_data[i] = {
        LastName: this.familyDetails_arr[i].LastName,
        HusbandName: this.familyDetails_arr[i].HusbandName,
        WifeName: this.familyDetails_arr[i].WifeName,
        FamilyStatus: this.familyDetails_arr[i].FamilyStatus,
        NumberChildren: this.familyDetails_arr[i].NumberChildren,
        // IsAccepted: this.FamilyDetails_score[i].FamilyDetails.IsAccepted,
        IncomePerCapita: this.familyDetails_arr[i].IncomePerCapita,
        Address: this.familyDetails_arr[i].Address,
      };
    }
  }

  // https://material.angular.io/components/select/overview
}
