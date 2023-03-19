import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Customer } from './interfaces/customer.interface';
import { CustomerService } from './services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerValidationService {

  constructor(private customerService: CustomerService) { }

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


  public validateEmailNotTaken(
    control: AbstractControl
  ): Observable<{ emailExists: boolean } | null> {
    return this.customerService.getCustomersByEmail(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length>0) {
          return { emailExists: true };
        }
        return null;
      })
    );
  }

  // validate email not taken but in update mode
  public validateEmailNotTakenInUpdateMode(
    oldEmail: string,
    control: AbstractControl
  ): Observable<{ emailExists: boolean } | null> {
    return this.customerService.getCustomersByEmail(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length>0 && customers[0].email !== oldEmail) {
          return { emailExists: true };
        }
        return null;
      })
    );
  }

}
