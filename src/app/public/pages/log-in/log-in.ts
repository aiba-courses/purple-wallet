import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgOptimizedImage } from '@angular/common';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    ButtonComponent,
    InputComponent,
    NgOptimizedImage,
    PasswordInputComponent,
  ],
  selector: 'app-log-in',
  styleUrl: './log-in.scss',
  templateUrl: './log-in.html',
})
export class LogIn {
  protected onInputChange(event: unknown) {
    console.log('-- event', event);
  }
}
