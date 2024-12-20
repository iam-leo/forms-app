import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

const defaultForm = {
  name: 'any',
  price: 10,
  inStorage: 3
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})

export class BasicPageComponent implements OnInit{
  /* public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }) */

    public myForm: FormGroup = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      price: [0, [ Validators.required, Validators.min(1) ]],
      inStorage: [0, [ Validators.required, Validators.min(1) ]],
    })

  constructor(
      private fb: FormBuilder,
      private validatorsService: ValidatorsService
    ) { }

  ngOnInit(): void {
    this.myForm.reset( defaultForm )
  }

  isValidField( field: string ):boolean | null{

    //return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError( field: string ):string | null {
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || { }

    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required':
          return "Este campo es requerido."
        case 'min':
          if (field === 'inStorage') {
            return 'Las existencias deben ser mayores a 0.';
          } else {
            return 'El precio debe ser mayor a 0.';
          }
        case 'minlength':
          return `El campo debe tener al menos ${ errors['minlength'].requiredLength } caracteres.`
        default:
          return null
      }
    }
    return null
  }

  onSave(): void {
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
