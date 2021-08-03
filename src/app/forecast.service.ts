import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http'; //Import HttpCLient
import { Observable } from 'rxjs'; //Import Observable
import { map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor( private http:HttpClient ) { }

  getWeatherForecast(){
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any) => {
        return new HttpParams()
        .set('lat', value.coords.latitude)
        .set('lon', value.coords.longitude)
        .set('units', 'metric')
        .set('appid', '5a6751d4be16627fc9e7323f55d3c58b')
      }),
      switchMap((values) => {
        return this.http.get('https://api.openweathermap.org/data/2.5/onecall', {params: values})
      })
    )
  }

  getMapboxLocation(){
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any) => {
        return new HttpParams()
        .set('lat', value.coords.latitude)
        .set('lon', value.coords.longitude)
        .set('json?access_token', 'pk.eyJ1IjoiZmVycnl3aW5zbGV5IiwiYSI6ImNrcnV2czJvcjAwcjYybnBzNWFtdGJtMzkifQ.vhe5OaSmuygYdiSt2hlQ3w&limit=1')
      }),
      switchMap((values) => {
        return this.http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/', {params: values})
      })
    )
  }

//   getMapbox(lat: number , lon: number, location?:string){

//     if(location!= undefined)//IF LOCATION TEXT BOX IS NULL
//     {
//       this.apihold =${this.mapUrl}/${location}.json?access_token=${this.mapKey}
//     }
//     else
//     {
//       this.apihold =${this.mapUrl}/${lon},${lat}.json?access_token=${this.mapKey}
//     }
//     console.log(this.apihold)
//       return this.http.get(this.apihold);

// }

}
