import { Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-selector.component.html',
  styleUrl: './city-selector.component.css'
})
export class CitySelectorComponent {
  cityInput: Signal<string> = signal('');
  @Output() citySelected = new EventEmitter<string>();

  public selectCity(){
    this.citySelected.emit(this.cityInput());
  }
}
