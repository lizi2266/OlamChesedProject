import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import Swal from "sweetalert2";
import { RequestService } from "../shared/services/request.service";
import { RequestData } from "../shared/entities/request";

@Component({
  selector: "app-set-request",
  templateUrl: "./set-request.component.html",
  styleUrls: ["./set-request.component.css"],
})
export class SetRequestComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SetRequestComponent>,
    private RequestService: RequestService
  ) {}

  // family: FamilyDetails;

  form = this.fb.group({
    FamilyId: this.fb.control(""),
    HusbandSalary: this.fb.control(""), //mony
    WifeSalary: this.fb.control(""), //mony;
    TotalRevenue: this.fb.control(""), //mony; 
    Acquaintanes: this.fb.control(""),
    AcquaintanesPhone: this.fb.control(""),
    RequestDate: this.fb.control(new Date().toISOString().substring(0, 10)),
    IsApproved: this.fb.control(""),
    IsAccepted: this.fb.control(""),
  });

  response: Request;
  id: number;
  ngOnInit() {
    if (this.data && this.data.FamilyId) {
      this.RequestService.getLastRequest(this.data.FamilyId).subscribe(
        (response) => {
          if (response !== null) {
            this.form = this.fb.group(response);
            this.id = response.Id;
            this.form.patchValue({
              FamilyId: "" + response.FamilyId,

              HusbandSalary: "" + response.HusbandSalary, //mony
              WifeSalary: "" + response.WifeSalary, //mony;
              TotalRevenue: "" + response.TotalRevenue, //mony;
              Acquaintanes: "" + response.Acquaintanes,
              AcquaintanesPhone:
                "" +
                (!response.AcquaintanesPhone
                  ? 0
                  : "0" + response.AcquaintanesPhone),
              //הכי חשוב!!
              RequestDate:
                "" +
                (!response.RequestDate
                  ? new Date().toISOString().substring(0, 10)
                  : new Date(new Date(response.RequestDate).setHours(3))
                      .toISOString()
                      .substring(0, 10)), //Date;
              IsApproved: "" + response.IsApproved,
              IsAccepted: "" + response.IsAccepted,
            });
          }
        }
      );
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
      // { data: "Order" }
    }
  }
  saveRequest() {
    const request1 = <RequestData>this.form.value;
    request1.FamilyId = this.data.FamilyId;
    console.log(request1);
    if (!request1.Id || request1.Id === 0) {
      request1.RequestDate = new Date();
      this.RequestService.createRequst(request1).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה!", "success");
        this.close();
      });
    } else {
      this.RequestService.UpdateRequst(request1).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה!", "success");
        this.close();
      });
    }
  }
}
