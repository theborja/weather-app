import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-fav-cities-list',
  imports: [],
  templateUrl: './fav-cities-list.component.html',
  styleUrl: './fav-cities-list.component.css'
})
export class FavCitiesListComponent{

  @Output() citySelected = new EventEmitter<string>();


  private weatherService = inject(WeatherService);

  public cities = computed(() => this.weatherService.cities());

  public selectCity(city: string){
    this.citySelected.emit(city);
  }

}

