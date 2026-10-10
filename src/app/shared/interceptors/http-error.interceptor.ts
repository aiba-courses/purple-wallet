import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  ErrorStoreService,
  IErrorModel,
} from '../services/error-store.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorStore = inject(ErrorStoreService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError: IErrorModel = {
        message: error.message,
        code: error.status,
        url: error.url,
        time: new Date().toISOString(),
      };

      errorStore.setValue(appError);

      return throwError(() => error);
    })
  );
};
