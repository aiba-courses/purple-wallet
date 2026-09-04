import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  InputSignal,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
})
export class InputComponent {
  iconUrl: InputSignal<string | null> = input<string | null>(null);
  type: InputSignal<'text' | 'email'> = input<'text' | 'email'>('text');
  placeholder = input('');
  disabled: InputSignal<boolean> = input<boolean>(false);
  @Input()
  value = '';
  @Output() controlValue: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.controlValue.emit(this.value);
  }
}
