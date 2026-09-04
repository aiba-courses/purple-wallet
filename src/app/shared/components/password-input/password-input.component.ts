import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

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
})
export class PasswordInputComponent {
  iconUrl = input<string>('icons/lock.svg');
  placeholder = input('');
  disabled = input<boolean>(false);
  type = signal<'password' | 'text'>('password');
  buttonIcon = signal<EPasswordInputIcons>(EPasswordInputIcons.Closed);

  @Input()
  value = '';

  @Output()
  controlValue: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.controlValue.emit(this.value);
  }

  onButtonToggleClick(): void {
    if (this.type() === 'password') {
      this.type.set('text');
      this.buttonIcon.set(EPasswordInputIcons.Opened);
    } else {
      this.type.set('password');
      this.buttonIcon.set(EPasswordInputIcons.Closed);
    }
  }
}
