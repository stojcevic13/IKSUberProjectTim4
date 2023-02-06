import { AfterViewInit, Component, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { MapService } from '../map.service';
import { forkJoin, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MessageService } from '../../sockets/socket.service';
import { Vehicle } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  center: number[] = [45.2396, 19.8227];
  private map: any;   // Luka je rekao da je ok da ovdje ostavimo any :D
  private markers: { [key: number]: L.Marker } = {};
  private available: { [key: number]: number } = {};
  private greenCar: L.Icon = L.icon({iconUrl:"../../../assets/images/car.png", iconSize:[40,40]});
  private redCar: L.Icon = L.icon({iconUrl:"../../../assets/images/red.png", iconSize:[40,40]});
  private icons: { [status: number]: L.Icon} = { 
    1: this.greenCar,
    0: this.redCar
   }

  @Input() showInstruction?: boolean;
  @Input() showCars: boolean = true;
  @Output() emitter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() emitter_kilometeres: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitter_minutes:EventEmitter<string> = new EventEmitter<string>();

  constructor(private mapService: MapService, private messageService: MessageService) { }
 
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

    if (this.showCars) {
      this.markVehicles();
    }


  }

  markVehicles(){
    this.messageService.subscribe("/topic/vehicles").subscribe(msg => {
      let payload = JSON.parse(msg.body)['payload'];
      console.log(payload);
      let vehicles:Vehicle[] = payload; 
      let v:Vehicle;
      for(v of vehicles){
          if(v.available){
            console.log(v.currentLocation);
            this.markCarLL(v.currentLocation.latitude, v.currentLocation.longitude, this.hashCode(v.licenseNumber), 1);
          }else{
            this.markCarLL(v.currentLocation.latitude, v.currentLocation.longitude, this.hashCode(v.licenseNumber), 0);
          } 
      }
    });
  }

  
  markDeparture(departure: string) {
    this.mapService.search(departure).subscribe({
      next: (result) => {
        L.marker([result[0].lat, result[0].lon]).addTo(this.map)  
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
      return val[0];
    }));
  }

  getLocation(lat: number, lng: number) {
    return this.mapService.reverseSearch(lat, lng).pipe(map(val => {
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

     if (!this.showInstruction) {
      document.getElementsByClassName('leaflet-routing-container')[0].remove();
     }
  
    })
  }
  
  
  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  
    setTimeout(() => {
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
    }, 0);

   
  }

  markCar(location: string, vId: number, available: number){
    this.mapService.search(location).subscribe({
      next: (result) => {
        this.markCarLL(result[0].lat, result[0].lon, vId, available)
      },
      error: () => { }
    })
  }

  markCarLL(lat: number, lon: number, id: number, available: number){
    if (this.markers.hasOwnProperty(id)) {
      this.markers[id].setLatLng([lat, lon]);
      if (this.available[id] != available) {
        this.available[id] = available;
        this.markers[id].setIcon(this.icons[available]);
      }

      return;
    }
    
    var markerOptions = {
      title: "CarLocation",
      clickable: true,
      draggable: false,
      icon: this.icons[available]
    }
    this.markers[id] = L.marker([lat, lon], markerOptions).addTo(this.map).openPopup();
    console.log(this.markers[id])
    this.available[id] = available;
  }

  ngOnDestroy():void{
    this.map.off();
    this.map.clearAllEventListeners();
    this.map.remove();

  }

  hashCode(s: string): number {
    return s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
  }
}
