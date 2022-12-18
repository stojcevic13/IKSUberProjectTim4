import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../map.service';
import { forkJoin, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import * as L from 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  private map: any;   // Luka je rekao da je ok da ovdje ostavimo any :D
  constructor(private mapService: MapService) {}

  private initMap(): void {
    this.map = L.map('map', { 
      center: [45.2396, 19.8227],               // centar postavljen na Novi Sad
      zoom: 13,                                 // inicijalni zoom 
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    
  }

  markDeparture(departure:string){
    this.mapService.search(departure).subscribe({
      next:(result) => {
        L.marker([result[0].lat, result[0].lon]).addTo(this.map)    // Luka izabere ovako, prvi element iz liste, mi moramo nekako da se osiguramo da prvi element bude unutar Novog Sada
        .bindPopup('START')
        .openPopup();
      },
      error: () => {},
    })
  }

  markDestination(destination:string){
    this.mapService.search(destination).subscribe({
      next:(result) => {
        L.marker([result[0].lat, result[0].lon]).addTo(this.map)
        .bindPopup('END')
        .openPopup();
      }, 
      error: () => {}
    })

  }

  getCoordinates(d:string):Observable<any>{
    return this.mapService.search(d).pipe(map(val => {
      console.log(val);
      return val[0];
    }));
  }

  // route(departure:string, destination:string): void {
  //   console.log("Try route")
  //   L.Routing.control({
  //     waypoints: [L.latLng(this.getLat(departure),this.getLng(departure)), L.latLng(this.getLat(destination), this.getLng(destination))],
  //   }).addTo(this.map);
  // }

  route(departure:string, destination:string): void {
    forkJoin([
      this.getCoordinates(departure),
      this.getCoordinates(destination)
    ]).subscribe((points)=>{
      console.log(points)
      L.Routing.control({
        waypoints: points
      }).addTo(this.map);
    })
  }

  

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.map?.invalidateSize();
    this.initMap();
  }
}
