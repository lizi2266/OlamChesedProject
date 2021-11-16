import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from "@angular/material";
import Swal from "sweetalert2";
import { RequestService } from "../shared/services/request.service";
import { RequestData } from "../shared/entities/request";

@Component({
  selector: "app-view-history-requests",
  templateUrl: "./view-history-requests.component.html",
  styleUrls: ["./view-history-requests.component.css"],
})
export class ViewHistoryRequestsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewHistoryRequestsComponent>,
    private RequestService: RequestService
  ) {}

  displayedColumns = [
    "AllDivisionsName",
    "RequestDate",
    "IsApproved",
    "HusbandSalary",
    "WifeSalary",
    "TotalRevenue"
  
  ];

  
  dataSource: MatTableDataSource<RequestData>;
  requests: RequestData[];
  id: number;
  ngOnInit() {
    if (this.data && this.data.FamilyId) {
      this.RequestService.getAllRequests(this.data.FamilyId).subscribe(
        (response) => {
        this.requests=response;
        this.dataSource = new MatTableDataSource(this.requests);
        }
      );
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
  
    }
  }
 
}
