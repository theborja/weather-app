import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast, Text } from '../../interfaces/weather.model';

describe('WeatherCardComponent', () => {
    let component: WeatherCardComponent;
    let fixture: ComponentFixture<WeatherCardComponent>;
    let weatherService: jasmine.SpyObj<WeatherService>;

    beforeEach(async () => {
        const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getForecast']);

        await TestBed.configureTestingModule({
            imports: [CommonModule,WeatherCardComponent],
            providers: [
                { provide: WeatherService, useValue: weatherServiceSpy },
                ChangeDetectorRef
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WeatherCardComponent);
        component = fixture.componentInstance;
        weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch forecast on city input change', () => {
        const mockForecast: Forecast = {
            location: { name: 'New York', region: '', country: '', lat: 0, lon: 0, tz_id: '', localtime_epoch: 0, localtime: '' },
            current: {
                temp_c: 23.6,
                last_updated_epoch: 0,
                last_updated: '',
                is_day: 1,
                condition: { text: Text.LightDrizzle, icon: '', code: 0 },
                wind_kph: 0,
                wind_degree: 0,
                wind_dir: '',
                precip_mm: 0,
                humidity: 0,
                cloud: 0,
                feelslike_c: 0,
            },
            forecast: { forecastday: [] }
        };
        weatherService.getForecast.and.returnValue(of(mockForecast));

        component.city = 'New York';
        component.ngOnChanges({ city: { currentValue: 'New York', previousValue: '', firstChange: true, isFirstChange: () => true } });

        expect(weatherService.getForecast).toHaveBeenCalledWith('New York');
        expect(component.showData).toBeTrue();
    });

    it('should handle error when fetching forecast', () => {
        weatherService.getForecast.and.returnValue(throwError(() => new Error('Error fetching forecast')));

        component.city = 'New York';
        component.ngOnChanges({ city: { currentValue: 'New York', previousValue: '', firstChange: true, isFirstChange: () => true } });

        expect(weatherService.getForecast).toHaveBeenCalledWith('New York');
        expect(component.showData).toBeFalse();
    });

    it('should convert epoch to day name', () => {
        const epoch = 1633036800; // 1st October 2021
        const dayName = component.dayNameFromEpoch(epoch);
        expect(dayName).toBe('Jueves');
    });

    it('should round temperature', () => {
        const temp = 23.6;
        const roundedTemp = component.roundTemp(temp);
        expect(roundedTemp).toBe(24);
    });

    it('should convert string to camel case', () => {
        const str = 'lunes';
        const camelCaseStr = component['toCamelCase'](str);
        expect(camelCaseStr).toBe('Lunes');
    });
});
