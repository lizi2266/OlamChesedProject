import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { parse } from 'querystring';
import Swal from 'sweetalert2';
import { DivisionsPointsService } from '../shared/services/divisions-points.service';

@Component({
  selector: 'app-sending-mail',
  templateUrl: './sending-mail.component.html',
  styleUrls: ['./sending-mail.component.css']
})


export class SendingMailComponent implements OnInit {
  massegMail:string[]=[];
// message:string="";
subject:string="";
date:Date;
to:string="";
timefrom:Time;
timeto:Time;
  constructor(public db:DivisionsPointsService ) { }

  ngOnInit() {
  }
insertDataAndSendingMassege(){
    this.massegMail=[];
this.massegMail.push(this.subject)//נושא ההודעה- מיקום 0
this.massegMail.push((this.timefrom).toString())//משעה - מיקום 1
this.massegMail.push((this.timeto).toString())// עד שעה - מיקום 2
this.massegMail.push(this.date.toString())//תאריך מיקום 3
this.massegMail.push(this.to)//מילל הנשלח - מיוקם 4
alert(this.timefrom+" "+this.timeto+""+this.subject+" "+this.to+" "+this.date);

    // this.db.sendMailToFamily(this.massegMail).subscribe(x=>x);
    Swal.fire('', 'השליחה בוצעה בהצלחה', 'success');
  }
}