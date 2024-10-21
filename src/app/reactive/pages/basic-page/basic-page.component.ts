import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      price: [0, [ Validators.required, Validators.min(0) ]],
      inStorage: [0, [ Validators.required, Validators.min(0) ]],
    })

  constructor ( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.myForm.reset( defaultForm )
  }

  onSave(): void {
    if( this.myForm.invalid ) return

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
