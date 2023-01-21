import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly _logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    this._logger.log(`➡️ [Request] ${method} ${url}`);

    return next.handle().pipe(
      tap(data =>
        this._logger.log(`⬅ [Response] ${method} ${url}
                
              [Response data] 
              ${JSON.stringify(data, null, 2)}
              
              `)
      )
    );
  }
}
