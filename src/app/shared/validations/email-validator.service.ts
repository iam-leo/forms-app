import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor() { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email })

    const httpCallObservable = new Observable< ValidationErrors | null >( (subscriber ) => {

      // NOTE:  user@... hace referencia a la respuesta que obtendriamos del backend.
      if (email === 'user@user.com'){
        subscriber.next({ emailTaken: true });

        // Limpieza y desuscripcion
        subscriber.complete();
      }

      // Caso en lo que escribió el usuario no existe
      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(2000)
    )

    return httpCallObservable;
  }

  /* validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email })

    return of({
      emailTaken: true
    })
  } */
}
