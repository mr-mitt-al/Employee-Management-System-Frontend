
import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access');

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}` 
      }
    });
  }
  return next(req);
};
