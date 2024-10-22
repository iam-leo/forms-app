import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      [ 'Mario Bros.', Validators.required ],
      [ "Assassin's Creed", Validators.required ],
    ])
  });

  constructor( private fb: FormBuilder ){ }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldinArray( formArray: FormArray, i: number){
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  getFieldError( field: string ):string | null {
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || { }

    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required':
          return "Este campo es requerido."
        case 'minlength':
          return `El campo debe tener al menos ${ errors['minlength'].requiredLength } caracteres.`
        default:
          return null
      }
    }
    return null
  }

  onSubmit():void {
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
