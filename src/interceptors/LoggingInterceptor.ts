import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = context.switchToHttp().getRequest();
    const now = Date.now();

    return next.handle().pipe(
      tap(() => this.logger.log(`[SUCCESS] ${method} ${url} - ${Date.now() - now}ms`)),
      catchError((err) => {
        this.logger.error(`[ERROR] ${method} ${url} - ${err.status || 500} - ${Date.now() - now}ms`);
        return throwError(() => err);
      }),
    );
  }
}