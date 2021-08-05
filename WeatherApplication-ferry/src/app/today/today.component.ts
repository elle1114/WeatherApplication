import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  lat:any;
  lon: any;

  loc:any;
  for:any;


  constructor( private forecastService:ForecastService ) { }

  ngOnInit(): void {

    this.getLoc()
    this.forecastService.getCurrentLoc(this.lon,this.lat).subscribe(data => {
      this.loc=data;
      console.log('Call MapBox API: ' , this.loc)
    })
    this.forecastService.getWeatherForecast(this.lat, this.lon).subscribe(data => {
      this.for=data;
      console.log('Call Weather Forecast API: ' , this.for)
    })

  }

  getLoc(){
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
    })
  }

  onSearchClick(data:any){
    this.forecastService.getPlaces(data).subscribe((res) => {
      this.loc=res;
      console.log('New Location: ' , this.loc.features[0].text)
    })
    this.forecastService.getWeatherForecast(this.loc.features[0].center[1],this.loc.features[0].center[0]).subscribe(data => {
      this.for=data;
      console.log('New Forecast: ' , this.for )
    })
  }

}

