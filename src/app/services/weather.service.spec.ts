import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Forecast, Text} from '../interfaces/weather.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WeatherService', () => {
    let service: WeatherService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [WeatherService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(WeatherService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch forecast data', () => {
        const dummyForecast: Forecast = {
            location: {
                name: 'London',
                region: '',
                country: 'UK',
                lat: 51.52,
                lon: -0.11,
                tz_id: 'Europe/London',
                localtime_epoch: 1633036800,
                localtime: '2021-10-01 00:00',
            },
            current: {
                last_updated_epoch: 1633036800,
                last_updated: '2021-10-01 00:00',
                temp_c: 14.0,
                is_day: 1,
                condition: {
                    text: Text.LightDrizzle,
                    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                    code: 1003,
                },
                wind_kph: 13.0,
                wind_degree: 230,
                wind_dir: 'SW',
                precip_mm: 0.0,
                humidity: 77,
                cloud: 75,
                feelslike_c: 13.0,
            },
            forecast: {
                forecastday: [
                ],
            },
        };

        service.getForecast('London').subscribe((forecast) => {
            expect(forecast).toEqual(dummyForecast);
        });

        const req = httpMock.expectOne(
            `${service['apiUrl']}?key=${service['apiKey']}&q=London&days=4&aqi=no&alerts=no&lang=es`
        );
        expect(req.request.method).toBe('GET');
        req.flush(dummyForecast);
    });

    it('should handle error when fetching forecast data', () => {
        service.getForecast('InvalidCity').subscribe(
            () => fail('expected an error, not forecast data'),
            (error) => {
                expect(error.message).toContain('Error fetching forecast');
            }
        );

        const req = httpMock.expectOne(
            `${service['apiUrl']}?key=${service['apiKey']}&q=InvalidCity&days=4&aqi=no&alerts=no&lang=es`
        );
        expect(req.request.method).toBe('GET');
        req.flush('Error fetching forecast', { status: 404, statusText: 'Not Found' });
    });
});