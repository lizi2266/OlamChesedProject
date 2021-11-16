import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { Manager } from '../shared/entities/Manager';
import { ServiceService } from '../shared/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None//מאפשר עיצוב אובייקטים של מטיריאל
})
export class LoginComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  constructor(private rourer: Router, private fb: FormBuilder, private service: ServiceService) {

  }
  ngOnInit() {

  }
  form = this.fb.group({
    UserName: this.fb.control("", [Validators.required]),
    Password: this.fb.control("", [Validators.required]),
  });



  login() {
    var manager = <Manager>this.form.value;
    manager.Id = 0;
    this.service.login(manager).subscribe(x => {
      if (!x) {


        Swal.fire('Oooops', "שם משתמש/ סיסמא לא תקין", 'error');
      }
      else {
        Swal.fire('', 'הכניסה בוצעה בהצלחה', 'success');
        localStorage.setItem('manager', JSON.stringify(x));
        this.service.userLogin.next(true);
        //TODO header - user
        this.rourer.navigate(["grid-support"]);
      }
    }

    );

  }
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'שדה חובה';
  //   }

  //   return this.email.hasError('email') ? 'מייל לא תקין' : '';
  // }
}
