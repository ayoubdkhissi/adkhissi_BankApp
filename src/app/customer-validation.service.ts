import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerValidationService {

  constructor() { }

  public validateFirstName() {
    
    let abstractControls = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]
    return abstractControls;
  }

  public validateLastName() {
    let abstractControls = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]
    return abstractControls;
  }

  public validateEmail() {
    let abstractControls = [
      Validators.required,
      Validators.email,
    ]
    return abstractControls;
  }

  public validateAddress() {
    let abstractControls = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
    return abstractControls;
  }

  public validateGender(){
    let abstractControls = [
      Validators.required,
      Validators.pattern(/^[Male|Female]+$/)
    ]
    return abstractControls;
  }

  public validateAccountType(){
    let abstractControls = [
      Validators.required,
      Validators.pattern(/^[Savings|Checking]+$/)
    ]
    return abstractControls;
  }

  public validateBalance(){
    let abstractControls = [
      Validators.required,
      Validators.min(0),
      Validators.max(1000000000000)
    ]
    return abstractControls;
  }
}
