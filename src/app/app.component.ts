import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  constructor(private rourer: Router) {
  
  }
   ngOnInit() {
 
  }
}

