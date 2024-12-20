import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Forecast } from '../interfaces/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = '398e62e50d0e4a0d80e181432241811';
  private apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

  #favsSignal = signal<string[]>([]);
  public cities = computed(() => this.#favsSignal());

  

  getForecast(city: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${this.apiUrl}?key=${this.apiKey}&q=${city}&days=4&aqi=no&alerts=no&lang=es`).pipe(
      catchError((error) => {
        console.error('Error fetching forecast', error);
        return throwError(() => new Error('Error fetching forecast'));
      }
    )
    );
  }

  addFav(city: string): void {
    this.#favsSignal.update(favs => [...favs, city]);
  }

  deleteFav(city: string): void {
    this.#favsSignal.update(favs => favs.filter(fav => fav !== city));
  }
}
