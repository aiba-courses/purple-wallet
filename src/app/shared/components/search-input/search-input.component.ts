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
  selector: 'app-search-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
})
export class SearchInputComponent {
  iconUrl: InputSignal<string> = input<string>('/icons/search.svg');
  type: InputSignal<'text'> = input<'text'>('text');
  placeholder = input('');
  disabled: InputSignal<boolean> = input<boolean>(false);
  @Output() controlValue: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  value: string | undefined = '';

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.controlValue.emit(this.value);
  }
}
