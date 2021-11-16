import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog, MatPaginator } from "@angular/material";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FamilyWithScoreService } from "../shared/services/family-with-score.service";
import { SetFamilyComponent } from "../set-family/set-family.component";
import { FamilyWithScore } from "../shared/entities/FamilyWithScore";
import { FamilyDetailsService } from "../shared/services/family-details.service";
import { SetRequestComponent } from "../set-request/set-request.component";
import { disableDebugTools } from "@angular/platform-browser";
import { ViewHistoryRequestsComponent } from "../view-history-requests/view-history-requests.component";
// import {MatPaginator} from '@angular/material/paginator'

export class data {
  position: number;
  Id: number;
  LastName: string;
  HusbandName: string;
  HusbandIdentity: number;
  WifeName: string;
  FamilyStatus: string; //1
  NumberChildren: number; //2
  IsAccepted: boolean; //3
  IncomePerCapita: number; //4
}

@Component({
  selector: "grid-get-support",
  templateUrl: "./grid-get-support.component.html",

})
export class GridGetSupportComponent implements OnInit, AfterViewInit {
  FamilyDetails_score: FamilyWithScore[];
  element_data = [];
  displayedColumns = [
    "select",
    "score",
    "LastName",
    "HusbandName",
    "WifeName",
    "FamilyStatus",
    "NumberChildren",
    "IncomePerCapita",
    "Actions",
    "AddRequest",
    "HistoryRequest",
  ];
  sorts = [
    { key: 0, value: "מספר ילדים" },
    { key: 1, value: "הכנסה לנפש" },
    { key: 2, value: "מצב משפחתי" },
    { key: 3, value: "קיבל תמיכה בעבר" }, //IsAccepted
  ];
  filterFamiliesId = '1';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  sorts2 = [];
  sorts3 = [];
  sorts4 = [];
  select1SortId: number = null;
  select2SortId: number = null;
  select3SortId: number = null;
  select4SortId: number = null;
  noSelectedRows = true;
  selection = new SelectionModel<FamilyWithScore>(true, []);
  dataSource: MatTableDataSource<FamilyWithScore>;
  constructor(
    private familyWithScoreService: FamilyWithScoreService,
    private dialog: MatDialog
  ) {}
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (!this.dataSource) return true;
    const numSelected = this.selection.selected.length;
    const page = this.dataSource.paginator.pageSize;
    let endIndex: number;
    if (
      this.dataSource.data.length >
      (this.dataSource.paginator.pageIndex + 1) *
        this.dataSource.paginator.pageSize
    ) {
      endIndex =
        (this.dataSource.paginator.pageIndex + 1) *
        this.dataSource.paginator.pageSize;
    } else {
      // tslint:disable-next-line:max-line-length
      endIndex =
        this.dataSource.data.length -
        this.dataSource.paginator.pageIndex *
          this.dataSource.paginator.pageSize;
    }
    return numSelected === endIndex;
  }
  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? ( this.noSelectedRows = true, this.selection.clear()) : this.selectRows();
  }
  selectRow(row) {
    this.selection.toggle(row);
  
    if(this.selection.selected.length === 0)
    {
      this.noSelectedRows = true;

    }
    else{
      this.noSelectedRows = false;

    }
  }
  diselectRow(){

    if(this.selection.selected.length === 0)
    {
      this.noSelectedRows = true;

    }
  }
  selectRows() {
    this.noSelectedRows = false;
    // tslint:disable-next-line:max-line-length
    let endIndex: number;
    // tslint:disable-next-line:max-line-length
    if (
      this.dataSource.data.length >
      (this.dataSource.paginator.pageIndex + 1) *
        this.dataSource.paginator.pageSize
    ) {
      endIndex =
        (this.dataSource.paginator.pageIndex + 1) *
        this.dataSource.paginator.pageSize;
    } else {
      // tslint:disable-next-line:max-line-length
      endIndex = this.dataSource.data.length;
    }

    for (
      let index =
        this.dataSource.paginator.pageIndex *
        this.dataSource.paginator.pageSize;
      index < endIndex;
      index++
    ) {
      this.selection.select(this.dataSource.data[index]);
    }

  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FamilyWithScore): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.FamilyDetails.Id
    }`;
  }
  selectFamilys() {
    var familysIds = this.selection.selected
      .map((x) => x.FamilyDetails.Id)
      .join(",");
    var backIds = localStorage.getItem("selectedFamilys");
    if (backIds && backIds !== "") {
      familysIds += "," + backIds;
    }
    localStorage.setItem("selectedFamilys", familysIds);
    this.FamilyDetails_score = this.FamilyDetails_score.filter(
      (x) => familysIds.indexOf(x.FamilyDetails.Id.toString()) === -1
    );
 //   this.masterToggle();
 this.selection.clear();
 this.noSelectedRows = true;
    this.dataSource = new MatTableDataSource(this.FamilyDetails_score);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.FamilyDetails.LastName.toLowerCase().includes(filter);
    };
  }
  selectSort(selectVal, numDd) {
    if (numDd === 1) {
      this.sorts2 = [...this.sorts.filter((x) => x.key !== selectVal)];
      this.sorts3 = [];
      this.sorts4 = [];
      this.select2SortId = null;
      this.select3SortId = null;
      this.select4SortId = null;
    } else if (numDd === 2) {
      this.sorts3 = [
        ...this.sorts.filter(
          (x) => x.key !== selectVal && x.key !== this.select1SortId
        ),
      ];
      this.sorts4 = [];

      this.select3SortId = null;
      this.select4SortId = null;
    } else if (numDd === 3) {
      this.sorts4 = [
        ...this.sorts.filter(
          (x) =>
            x.key !== selectVal &&
            x.key !== this.select1SortId &&
            x.key !== this.select2SortId
        ),
      ];

      this.select4SortId = null;
    }
  }
  AddRequestFamily(FamilyId) {
    const dialogRef = this.dialog.open(SetRequestComponent, {
      // width:'200',
      // height:'100',
      data: { FamilyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.sortData(this.filterFamiliesId);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ViewHistoryRequest(FamilyId) {
    const dialogRef = this.dialog.open(ViewHistoryRequestsComponent, {
      data: { FamilyId },
    });
    dialogRef.afterClosed().subscribe((result) => {});
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {}

  getFamiliesByIds() {
    var familyIds = localStorage.getItem("selectedFamilys");
    if (familyIds != null) {
      var ids = familyIds.split(",");

      this.familyWithScoreService.getFamiliesByIds(ids).subscribe((res) => {
        debugger;
        this.dataSource = new MatTableDataSource(this.FamilyDetails_score);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (
          data,
          filter: string
        ): boolean {
          return data.FamilyDetails.LastName.toLowerCase().includes(filter);
        };
      });
    }
  }

  sortData(filterId) {
    this.familyWithScoreService
      .getAllByFilter(
        this.select1SortId,
        this.select2SortId,
        this.select3SortId,
        this.select4SortId,
        filterId
      )
      .subscribe((res) => {
        var familyIds = localStorage.getItem("selectedFamilys");
        if (familyIds != null) {
          var ids = familyIds.split(",");
          this.FamilyDetails_score = res.filter(
            (x) => ids.indexOf(x.FamilyDetails.Id.toString()) === -1
          );
        } else {
          this.FamilyDetails_score = <FamilyWithScore[]>res;
        }
        this.dataSource = new MatTableDataSource(this.FamilyDetails_score);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (
          data,
          filter: string
        ): boolean {
          return data.FamilyDetails.LastName.toLowerCase().includes(filter);
        };
      });
  }

  addFamily() {
    this.editFamily(null);
  }

  editFamily(familyId) {
    const dialogRef = this.dialog.open(SetFamilyComponent, {
      data: { familyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.sortData(this.filterFamiliesId);
    });
  }

  create_data() {
    for (let i = 0; i < this.FamilyDetails_score.length; i++) {
      this.element_data[i] = {
        LastName: this.FamilyDetails_score[i].FamilyDetails.LastName,
        HusbandName: this.FamilyDetails_score[i].FamilyDetails.HusbandName,
        WifeName: this.FamilyDetails_score[i].FamilyDetails.WifeName,
        FamilyStatus: this.FamilyDetails_score[i].FamilyDetails.FamilyStatus,
        NumberChildren:
          this.FamilyDetails_score[i].FamilyDetails.NumberChildren,
        //IsAccepted: this.FamilyDetails_score[i].FamilyDetails.IsAccepted,
        IncomePerCapita:
          this.FamilyDetails_score[i].FamilyDetails.IncomePerCapita,
      };
    }
  }
  sortControl = new FormControl("", Validators.required);
  selectFormControl = new FormControl("", Validators.required);
}
