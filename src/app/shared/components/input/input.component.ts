import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  Input,
  InputSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {
    /* empty */
  };
  private onTouched: () => void = () => {
    /* empty */
  };

  iconUrl: InputSignal<string | null> = input<string | null>(null);
  type: InputSignal<'text' | 'email'> = input<'text' | 'email'>('text');
  placeholder = input('');
  @Input()
  disabled = false;

  value = '';

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
