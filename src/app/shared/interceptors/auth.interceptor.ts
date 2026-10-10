import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStoreService } from '../services/authStore.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authStore = inject(AuthStoreService);
  const isAuthenticated = authService.isAuthenticated$.getValue();

  if (!isAuthenticated) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `${authStore.getValue('tokenType')} ${authStore.getValue('token')}`
    }
  });

  return next(authReq);
};
