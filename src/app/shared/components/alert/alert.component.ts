import { Component, EventEmitter, Input, Output } from '@angular/core';
export type AlertType = 'success' | 'error' | 'warning' | 'info';
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: AlertType = 'info';

  @Input() title = '';

  @Input() message = '';

  @Input() dismissible = true;

  @Output() closed = new EventEmitter<void>();

  isVisible = true;

  closeAlert(): void {
    this.isVisible = false;
    this.closed.emit();
  }

}
