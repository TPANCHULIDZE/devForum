import { NestInterceptor } from "@nestjs/common";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { Observable } from "rxjs";

// export class TransformInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//     return
//   }
// }