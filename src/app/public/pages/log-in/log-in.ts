import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgOptimizedImage } from '@angular/common';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, of, take, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { nospaceValidator } from '../../../shared/validators/nospace.validator';

@Component({
  imports: [
    RouterLink,
    ButtonComponent,
    InputComponent,
    NgOptimizedImage,
    PasswordInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-log-in',
  styleUrl: './log-in.scss',
  templateUrl: './log-in.html',
})
export class LogIn implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private _router = inject(Router);

  error = signal('');

  protected onLoginClick() {
    this._authService
      .login$(
        this.form.controls.email.value,
        this.form.controls.password.value ?? ''
      )
      .pipe(
        take(1),
        tap(() => this._router.navigate(['private'])),
        catchError(err => {
          this.error.set(err);
          return of(err);
        })
      )
      .subscribe();
  }

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, nospaceValidator()],
    }),
  });

  ngOnInit() {
    const i = 1+1;
  }
}
