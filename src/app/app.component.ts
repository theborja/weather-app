import { Component } from '@angular/core';
import { WeatherCardComponent } from "./components/weather-card/weather-card.component";
import { CitySelectorComponent } from "./components/city-selector/city-selector.component";

@Component({
    selector: 'app-root',
    imports: [WeatherCardComponent, CitySelectorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'weather-app';
  selectedCity = '';
  defaultCity = 'Madrid';

  updateCity(city: string) {
    this.selectedCity = city;
    }
}
