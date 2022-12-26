import { AfterViewInit, Component, EventEmitter, Output, OnDestroy } from '@angular/core';
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
export class MapComponent implements AfterViewInit, OnDestroy {

  center: number[] = [45.2396, 19.8227];
  private map: any;   // Luka je rekao da je ok da ovdje ostavimo any :D

  @Output() emitter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() emitter_kilometeres: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitter_minutes:EventEmitter<string> = new EventEmitter<string>();
  constructor(private mapService: MapService) { }

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

  markDeparture(departure: string) {
    this.mapService.search(departure).subscribe({
      next: (result) => {
        L.marker([result[0].lat, result[0].lon]).addTo(this.map)    // Luka izabere ovako, prvi element iz liste, mi moramo nekako da se osiguramo da prvi element bude unutar Novog Sada
          .bindPopup('START')
          .openPopup();
      },
      error: () => { },
    })
  }

  markDestination(destination: string) {
    this.mapService.search(destination).subscribe({
      next: (result) => {
        L.marker([result[0].lat, result[0].lon]).addTo(this.map)
          .bindPopup('END')
          .openPopup();
      },
      error: () => { }
    })

  }

  getCoordinates(d: string): Observable<any> {
    return this.mapService.search(d).pipe(map(val => {
      console.log(val);
      return val[0];
    }));
  }

  getLocation(lat: number, lng: number) {
    return this.mapService.reverseSearch(lat, lng).pipe(map(val => {
      console.log(val.address, "bla");
      return `${val.address.road} ${val.address.house_number}`
    }));
  }


  route(departure: string, destination: string): void {
    let kilometers:number = 0;
    let time:number = 0;
    forkJoin([
      this.getCoordinates(departure),
      this.getCoordinates(destination)
    ]).subscribe((points) => {
      L.Routing.control({
        waypoints: points
      }).addTo(this.map).on('routesfound', (e) => {
        let routes = e.routes;
        let summary = routes[0].summary;
        kilometers = summary.totalDistance/1000;
        time = summary.totalTime% 3600/60;
        this.emitter_kilometeres.emit(String(Number(kilometers.toFixed(2))));
        this.emitter_minutes.emit(String(Number(time.toFixed(2))));
     });
  
    })
  }


  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    this.map.on('click', (e: { latlng: { lat: number; lng: number; }; }) => {
      forkJoin([this.getLocation(e.latlng.lat, e.latlng.lng)]).subscribe((startLocation) => {
        this.emitter.emit(startLocation);
      })

    });

    this.map.on('click', (e: { latlng: { lat: number; lng: number; }; }) => {
      forkJoin([this.getLocation(e.latlng.lat, e.latlng.lng)]).subscribe((location) => {
        this.emitter.emit(location);
      })

    });


  }

  ngOnDestroy():void{
    this.map.off();
    this.map.clearAllEventListeners();
    this.map.remove();

  }



}
