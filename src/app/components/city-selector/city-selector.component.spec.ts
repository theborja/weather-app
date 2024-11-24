import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CitySelectorComponent } from './city-selector.component';
import { signal } from '@angular/core';

describe('CitySelectorComponent', () => {
    let component: CitySelectorComponent;
    let fixture: ComponentFixture<CitySelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, CitySelectorComponent],
            declarations: []
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CitySelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize cityInput as an empty string', () => {
        expect(component.cityInput()).toBe('');
    });

    it('should emit citySelected with the correct value when selectCity is called', () => {
        spyOn(component.citySelected, 'emit');
        component.cityInput.set('Madrid'); 
        component.selectCity();
        expect(component.citySelected.emit).toHaveBeenCalledWith('Madrid');
    });

    it('should call selectCity when the form is submitted', () => {
        spyOn(component, 'selectCity');
        
        const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
        formElement.dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        
        expect(component.selectCity).toHaveBeenCalled();
    });

    it('should render an input and a submit button', () => {
        const inputElement = fixture.debugElement.query(By.css('input'));
        const buttonElement = fixture.debugElement.query(By.css('button'));
      
        expect(inputElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
      });
      
      
      
      

    
      
      
});