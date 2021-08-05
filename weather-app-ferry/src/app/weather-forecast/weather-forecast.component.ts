import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service'

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  lat:any;
  lon: any;

  day = ['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thur' , 'Fri' , 'Sat' ]
  dayday: any[]=[];

  loc:any;
  for:any;
  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.forecastService.getCurrentLoc(this.lon,this.lat).subscribe(data => {
        this.loc=data;
        console.log('Call MapBox API: ' , this.loc)
      })
      this.forecastService.getWeatherForecast(this.lat, this.lon).subscribe(data => {
        this.for=data;
        this.getDay();
        console.log('Call Weather Forecast API: ' , this.for)

      })
    })

  }
  onClick(data:any){
    this.forecastService.getPlaces(data).subscribe((res) => {
      this.loc=res;
      console.log('New Location: ' , this.loc)
    })
    this.forecastService.getWeatherForecast(this.loc.features[0].center[1],this.loc.features[0].center[0]).subscribe(data => {
      this.for=data;
      console.log('New Forecast: ' , this.for )
    })
  }

  getDay(){
    for (const dailyfor in this.for.daily){
      let dates = new Date(this.for.daily[dailyfor].dt*1000)
      console.log(dates)
      this.dayday.push(this.day[dates.getDay()])
    }
  }

}
