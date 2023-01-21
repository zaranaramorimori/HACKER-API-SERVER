import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import * as Sentry from "@sentry/minimal";
import { catchError, Observable } from "rxjs";

//todo 리팩토링 필요

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        Sentry.captureException(error);
        return null;
      })
    );
  }
}
