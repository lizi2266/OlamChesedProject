import { Component, OnInit } from '@angular/core';
import { FamilyDetails } from '../shared/entities/familyDetails';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //  compareChildsAndInc( a,  b)
  // {
  // //  let aa: FamilyDetails=a;
  // //  let bb:FamilyDetails=b;
  // //  if(aa.NumChildren>bb.NumChildren)
  // //  if(aa.Incomes<=bb.Incomes)
  //  return -1;
  //  else
  //  return 1;
   
  // }
  // sortByChildernAndIncomes()
  // {
  //   let details:FamilyDetails []=[];
  //   details.sort(this.compareChildsAndInc)
  // }

}
