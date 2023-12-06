import {Component, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import { MapService } from './map.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { environment } from 'src/env/environment';
import { Point } from 'src/app/feature-modules/tour-authoring/model/points.model';
import { Encounter } from 'src/app/feature-modules/encounter/model/encounter.model';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {

  private map: any;
  searchAddress: string = '';
  startingAddress: string = '';
  endingAddress: string = '';
  @Output() longitude: EventEmitter<number> = new EventEmitter<number>();
  @Output() latitude: EventEmitter<number> = new EventEmitter<number>();
  @Output() markerClicked: EventEmitter<Encounter> = new EventEmitter<Encounter>();
  @Input() points: Point[] = [];
  @Input() encounters: Encounter[] = [];
  private markers : L.Marker[] = [];

  constructor(private mapService: MapService) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
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
    
    this.points.forEach((point) => {
      const redIcon = L.icon({
        iconUrl: 'https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png',
        iconSize: [31, 41],
        iconAnchor: [13, 41],
      });

      const marker = new L.Marker([point.latitude, point.longitude], { icon: redIcon }).addTo(this.map);
      this.markers.push(marker);
    }); 
    
    console.log("Mapa enc:",this.encounters)

    this.encounters.forEach((encounter) => {
      const greenIcon = L.icon({
        iconUrl: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Marker-Outside-Chartreuse-icon.png',
        iconSize: [31, 41],
        iconAnchor: [13, 41],
      });

      const marker = new L.Marker([encounter.location.latitude, encounter.location.longitude], { icon: greenIcon }).addTo(this.map);
      
      marker.on('click', () => {
        this.handleGreenMarkerClick(encounter); // Emit marker data on marker click
      });

      this.markers.push(marker);

      
     

    });  
    tiles.addTo(this.map);
    this.registerOnClick();
  }

  private handleGreenMarkerClick(encounter: Encounter) {
    //console.log('Green marker clicked:', encounter);
    this.markerClicked.emit(encounter); // Emitting the encounter data when a green marker is clicked
  }

  ngOnChanges(){
    //console.log('Encounters received:', this.encounters);
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    })
    
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.latitude.emit(coord.lat);
      this.longitude.emit(coord.lng);
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      new L.Marker([lat, lng]).addTo(this.map);
    });
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor: [13, 41],
    });

    // here

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  // Primer sam dao za search funkciju
  search(searchAddress: string): void {
    this.mapService.search(searchAddress).subscribe({
      next: (result: any) => {
        console.log(result);
        this.latitude.emit(result[0].lat);
        this.longitude.emit(result[0].lon);
        if (result[0]) {
          L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .bindPopup('Pozdrav iz ' + searchAddress + '!')
            .openPopup();

          // Metoda nece raditi zbog CORS Policy-ja
          this.mapService.getElevation(result[0].lat, result[0].lon).subscribe({
            next: (elevation: any) => {
              console.log('Nadmorska visina na toj adresi: ' + elevation);
              alert('Nadmorska visina na toj adresi: ' + elevation);
            },
            error: () => { },
          });

        }
      },
      error: () => { },
    });
  }

  // Primer sam dao za pretragu rute
  findRoute(startingAddress: string, endingAddress: string): void {
    let startLatLng: L.LatLng;
    let endLatLng: L.LatLng;
    this.mapService.search(startingAddress).subscribe({
      next: (result: any) => {
        console.log(result);
        if (result[0]) {
          startLatLng =  L.latLng(result[0].lat, result[0].lon);

          this.mapService.search(endingAddress).subscribe({
            next: (result: any) => {
              console.log(result);
              if (result[0]) {
                endLatLng =  L.latLng(result[0].lat, result[0].lon);
                this.setRoute(startLatLng, endLatLng);
              }
            },
            error: () => { },
          });

        }
      },
      error: () => { },
    });
  }

  // Dat primer, samo sa parametrima
  setRoute(startLatLng: L.LatLng, endLatLng: L.LatLng): void {
    const routeControl = L.Routing.control({
      waypoints: [startLatLng, endLatLng],
      router: L.routing.mapbox(environment.mapBoxApiKey, { profile: 'mapbox/walking' })
    }).addTo(this.map);

    routeControl.on('routesfound', function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
    });
  }
}