import { ChangeDetectorRef, Component, computed, OnChanges, OnInit, signal, SimpleChanges, input, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Forecast } from '../../interfaces/weather.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-weather-card',
    imports: [CommonModule],
    templateUrl: './weather-card.component.html',
    styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent implements OnChanges {
  private weatherService = inject(WeatherService);
  private cdr = inject(ChangeDetectorRef);

  readonly city = input<string>('');
  #weatherSignal = signal<Forecast>({});

  public locationComputed = computed(() => this.#weatherSignal()?.location);
  public currentComputed = computed(() => this.#weatherSignal()?.current);
  public forecastComputed = computed(() => this.#weatherSignal()?.forecast);


  public currentDate = new Date();
  public currentDay = this.currentDate.getDate();
  public currentDayName = this.toCamelCase(this.currentDate.toLocaleString('es', { weekday: 'long' }));
  public currentMonth = this.currentDate.getMonth();
  public currentYear = this.currentDate.getFullYear();

  public showData = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.showData = true;
    this.weatherService.getForecast(this.city()).subscribe({
      next: (data) => { 
        this.#weatherSignal.set(data);
        this.showData = true;
      },
      error: (err) => {
        this.showData = false;
        this.cdr.detectChanges();
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

}

