import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  igit:any;
  tae:any;
  constructor( private forecastService:ForecastService ) { }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.tae=data;
      console.log(this.tae)
    });

    this.forecastService.getMapboxLocation().subscribe(data => {
      this.igit=data;
      console.log(this.igit)
    })

  }

}
