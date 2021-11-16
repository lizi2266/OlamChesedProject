import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../shared/services/service.service';
@Component({
  selector: 'app-auto-complit-google',
  templateUrl: './auto-complit-google.component.html',
  styleUrls: ['./auto-complit-google.component.css']
})
export class AutoComplitGoogleComponent implements OnInit {
  address1Field: HTMLInputElement;

  autocomplete: google.maps.places.Autocomplete;

  constructor(private service: ServiceService, 
    private route: Router) { }
    
  ngAfterViewInit() {
    this.address1Field = document.querySelector("#ship-address") as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(this.address1Field, {
      componentRestrictions: { country: ["ISR"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });
    this.address1Field.focus();
    this.autocomplete.addListener("place_changed", () => {
      const place = this.autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {

        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });


  }
  ngOnInit() {
  }

}
