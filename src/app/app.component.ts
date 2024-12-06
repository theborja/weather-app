import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherCardComponent } from "./components/weather-card/weather-card.component";
import { CitySelectorComponent } from "./components/city-selector/city-selector.component";
import { FormsModule } from '@angular/forms';

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
