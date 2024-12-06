import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCitiesListComponent } from './fav-cities-list.component';

describe('FavCitiesListComponent', () => {
  let component: FavCitiesListComponent;
  let fixture: ComponentFixture<FavCitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavCitiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavCitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
