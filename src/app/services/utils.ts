import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(operation: string, userErrorMessage: string): any {
  return ({ error }: HttpErrorResponse) => {
    // TODO: send error data to logging service
    console.error(`'Operation: ${operation}. Error: ${error}`);
    return throwError(userErrorMessage);
  };
}
