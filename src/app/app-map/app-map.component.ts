import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class AppMapComponent implements OnInit {
  lat = 32.050567424476085;
  lng = 34.95563729014437;
  constructor() { }

 @ViewChild('map') mapElement: any;
    map: google.maps.Map;

  ngOnInit(): void {
   const mapProperties = {
        center: new google.maps.LatLng(32.050567424476085, 34.95563729014437),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}
  //רשימת מיקומים של האנשים
  // placese=[{"lng":7.809007,"lat":51.678418},{"lng":9.809007,"lat":61.678418}];



  // This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each Address.

// interface Address {
//   center: google.maps.LatLngLiteral;
//   population: number;
// }

// const citymap: Record<string, Address> = {
//   chicago: {
//     center: { lat: 41.878, lng: -87.629 },
//     population: 2714856,
//   },
//   newyork: {
//     center: { lat: 40.714, lng: -74.005 },
//     population: 8405837,
//   },
//   losangeles: {
//     center: { lat: 34.052, lng: -118.243 },
//     population: 3857799,
//   },
//   vancouver: {
//     center: { lat: 49.25, lng: -123.1 },
//     population: 603502,
//   },
// };

// function initMap(): void {
//   // Create the map.
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       zoom: 4,
//       center: { lat: 37.09, lng: -95.712 },
//       mapTypeId: "terrain",
//     }
//   );

//   // Construct the circle for each value in citymap.
//   // Note: We scale the area of the circle based on the population.
//   for (const Address in citymap) {
//     // Add the circle for this Address to the map.
//     const cityCircle = new google.maps.Circle({
//       strokeColor: "#FF0000",
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: "#FF0000",
//       fillOpacity: 0.35,
//       map,
//       center: citymap[Address].center,
//       radius: Math.sqrt(citymap[Address].population) * 100,
//     });
  // }
}
// }
