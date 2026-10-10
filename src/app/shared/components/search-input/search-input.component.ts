import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  InputSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
  ],
})
export class SearchInputComponent implements ControlValueAccessor {
  iconUrl: InputSignal<string> = input<string>('/icons/search.svg');
  type: InputSignal<'text'> = input<'text'>('text');
  placeholder = input('');

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {
    /* empty */
  };
  private onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = value;

    this.onChange(value);
    this.onTouched();
  }
}
