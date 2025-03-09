import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent {
  @Input() errorMessage: string = '';  
  @Input() showError: boolean = false; 
  @Output() errorClosed = new EventEmitter<void>(); 
  closeError() {
    this.showError = false;  
    this.errorClosed.emit(); 
  }
}
