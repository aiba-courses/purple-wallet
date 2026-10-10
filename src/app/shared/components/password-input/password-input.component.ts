import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter, forwardRef,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  iconUrl = input<string>('icons/lock.svg');
  placeholder = input('');

  @Input()
  disabled = false;
  type = signal<'password' | 'text'>('password');
  buttonIcon = signal<EPasswordInputIcons>(EPasswordInputIcons.Closed);

  value = '';

  onButtonToggleClick(): void {
    if (this.type() === 'password') {
      this.type.set('text');
      this.buttonIcon.set(EPasswordInputIcons.Opened);
    } else {
      this.type.set('password');
      this.buttonIcon.set(EPasswordInputIcons.Closed);
    }
  }

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
