import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Forecast } from '../interfaces/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '398e62e50d0e4a0d80e181432241811';
  private apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) {}
  

  getForecast(city: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${this.apiUrl}?key=${this.apiKey}&q=${city}&days=4&aqi=no&alerts=no&lang=es`).pipe(
      catchError((error) => {
        console.error('Error fetching forecast', error);
        return throwError(() => new Error('Error fetching forecast'));
      }
    )
    );
  }
}
