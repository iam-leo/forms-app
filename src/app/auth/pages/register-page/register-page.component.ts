import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validations/validator';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( customValidators.firstNameAndLastnamePattern ) ] ],
    email: ['', [ Validators.required, Validators.email, Validators.pattern( customValidators.emailPattern )] ],
    username: ['', [ Validators.required, customValidators.cantBeStrider] ],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    confirmPassword: ['', [ Validators.required ] ]
  })

  constructor( private fb: FormBuilder ) { }

  isValidField( field: string){
    // TODO:  obtener validacion desde un servicio
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm)
  }
}
