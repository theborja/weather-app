import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  provideHttpClient } from '@angular/common/http';
import { FavCitiesListComponent } from './fav-cities-list.component';
import { WeatherService } from '../../services/weather.service';

  describe('FavCitiesListComponent', () => {
    let component: FavCitiesListComponent;
    let fixture: ComponentFixture<FavCitiesListComponent>;
    let weatherService: WeatherService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [],
        providers: [provideHttpClient(), WeatherService]
      })
      .compileComponents();

      fixture = TestBed.createComponent(FavCitiesListComponent);
      component = fixture.componentInstance;
      weatherService = TestBed.inject(WeatherService);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit citySelected event when selectCity is called', () => {
      spyOn(component.citySelected, 'emit');
      const city = 'New York';
      component.selectCity(city);
      expect(component.citySelected.emit).toHaveBeenCalledWith(city);
    });

    it('should have a list of cities', () => {
      expect(component.cities).toBeDefined();
    });

    it('should have a list of cities filled if some are added', () => {
      weatherService.addFav('New York');
      weatherService.addFav('Los Angeles');  
      expect(component.cities()).toEqual(['New York', 'Los Angeles']);
    });

    
  });
