import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validations/validator';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validations/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ] ],
    //email: ['', [ Validators.required, Validators.email, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidatorService() ] ],
    email: ['', [ Validators.required, Validators.email, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidatorService ] ],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider] ],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    confirmPassword: ['', [ Validators.required ] ]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'confirmPassword')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) { }

  isValidField( field: string){
    return this.validatorsService.isValidField(this.myForm, field);
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm)
  }
}
