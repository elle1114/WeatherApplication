import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  lat:any;
  lon: any;

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
        console.log('Call Weather Forecast API: ' , this.for)
      })
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
