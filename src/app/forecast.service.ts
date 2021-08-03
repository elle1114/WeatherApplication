import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall'; //Onecall API
  mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'; //Mapbox API

  weatherKey = '5a6751d4be16627fc9e7323f55d3c58b'; //Onecall KEY
  mapboxKey = 'pk.eyJ1IjoiZmVycnl3aW5zbGV5IiwiYSI6ImNrcnV2czJvcjAwcjYybnBzNWFtdGJtMzkifQ.vhe5OaSmuygYdiSt2hlQ3w&26limit=1'; //Mapbox API

  constructor( private http:HttpClient ) { }

  getWeatherForecast(lat:any, lon:any){
    return this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&units=metric&appid=${this.weatherKey}`);
  }

  getCurrentLoc(lat:any, lon:any){

    return this.http.get(`${this.mapboxUrl}${lat},${lon}.json?access_token=${this.mapboxKey}`);
  }

  getPlaces(data: any): Observable <any> {
    return this.http.get(`${this.mapboxUrl}${data}.json?access_token=${this.mapboxKey}}`);
  }
}
