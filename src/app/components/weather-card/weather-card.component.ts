import { ChangeDetectorRef, Component, computed, signal, input, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Forecast } from '../../interfaces/weather.model';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  private weatherService = inject(WeatherService);
  private cdr = inject(ChangeDetectorRef);

  readonly city = input<string>('');
  #weatherSignal = signal<Forecast>({});

  public locationComputed = computed(() => this.#weatherSignal()?.location);
  public currentComputed = computed(() => this.#weatherSignal()?.current);
  public forecastComputed = computed(() => this.#weatherSignal()?.forecast);

  public isFavorite = signal(false);


  public currentDate = new Date();
  public currentDay = this.currentDate.getDate();
  public currentDayName = this.toCamelCase(this.currentDate.toLocaleString('es', { weekday: 'long' }));
  public currentMonth = this.currentDate.getMonth();
  public currentYear = this.currentDate.getFullYear();

  public showData = false;

  constructor() {
    toObservable(this.city).subscribe({
      next: () => {
        this.showData = true;
        this.isFavorite.set(this.weatherService.cities().includes(this.city()));
        this.weatherService.getForecast(this.city()).subscribe({
          next: (data) => {
            this.#weatherSignal.set(data);
            this.showData = true;
          },
          error: () => {
            this.showData = false;
            this.cdr.detectChanges();
          }
        });
      }
    });

  }

  dayNameFromEpoch(epoch?: number): string {
    if (epoch) {
      const dateObj = new Date(epoch * 1000);
      return this.toCamelCase(dateObj.toLocaleString('es', { weekday: 'long' }));
    } else {
      return "";
    }
  }

  roundTemp(temp?: number): number {
    if (temp) {
      return Math.round(temp);
    }
    else {
      return 0;
    }
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public addFav(): void {
    const fav = this.locationComputed()!.name + ', ' + this.locationComputed()!.country;
    this.weatherService.addFav(fav);
    this.isFavorite.set(true);
  }

  public deleteFav(): void {
    const fav = this.locationComputed()!.name + ', ' + this.locationComputed()!.country;
    this.isFavorite.set(false);
    this.weatherService.deleteFav(fav);
  }

  onSvgKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (!this.isFavorite()) {
        this.addFav();
      } else {
        this.deleteFav();
      }
    }
  }

}

