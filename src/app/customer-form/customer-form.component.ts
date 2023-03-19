import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerValidationService } from '../customer-validation.service';
import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';


/*This is a dump component used for adding or delleting a new Customer */

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  public isAddMode: boolean = true;

  public customerForm: FormGroup;

  public isLoading: boolean = false;

  public customer?: Customer;

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerValidationService: CustomerValidationService) {

    this.customerForm = this.formBuilder.group({
      firstName: ['',
        this.customerValidationService.validateFirstName(),
        []],

      lastName: ['', 
        this.customerValidationService.validateLastName(),
        []],

      email: ['', 
        this.customerValidationService.validateEmail(),
        this.customerValidationService.validateEmailNotTaken.bind(this)],
      
      address: ['', 
        this.customerValidationService.validateAddress(),
        []],
      
      gender: ['Male', 
        this.customerValidationService.validateGender(),
        []],
      
      accountType: ['Savings',
        this.customerValidationService.validateAccountType(),
        []],
      
      balance: ['', 
        this.customerValidationService.validateBalance(),
        []]
    });
  }

  ngOnInit(): void {


    this.route.url.subscribe(url => {


      let currentRoute = url[url.length - 2]?.path;

      if (currentRoute === 'editCustomer') {
        this.isAddMode = false;
        this.route.params
          .subscribe(params => {
            let id = params['id'];

            this.customerService
              .getCustomerById(id)
              .subscribe({
                next: (customer) => {
                  this.customer = customer;

                  this.customerForm = this.formBuilder.group({
                    firstName: [this.customer?.firstName, this.customerValidationService.validateFirstName()],
                    lastName: [this.customer?.lastName, this.customerValidationService.validateLastName()],
                    email: [this.customer?.email,
                        this.customerValidationService.validateEmail(),
                        this.customerValidationService.validateEmailNotTakenInUpdateMode.bind(this, this.customer?.email)],
                    address: [this.customer?.address, this.customerValidationService.validateAddress()],
                    gender: [this.customer?.gender, this.customerValidationService.validateGender()],
                    accountType: [this.customer?.account.type, this.customerValidationService.validateAccountType()],
                    balance: [this.customer?.account.balance, this.customerValidationService.validateBalance()]
                  });
                },
                error: (err) => {
                  this.router.navigate(['notFound']);
                }
              });
          });
      }
    });
  }



  submit() {
    console.log(this.customerForm.value);

    this.isLoading = true;

    if (!this.customerForm.valid)
      return;

    if (this.isAddMode) {

      let customer: Customer = {
        id: this.generateRandomId(),
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        email: this.customerForm.value.email,
        address: this.customerForm.value.address,
        gender: this.customerForm.value.gender,
        image: this.generateRandomImage(),
        account: {
          accountNumber: this.generateRandomAccountNumber(),
          type: this.customerForm.value.accountType,
          balance: parseFloat(this.customerForm.value.balance)
        }
      };

      console.log(customer);

      this.customerService.addCustomer(customer).subscribe({
        next: () => {
          this.router.navigate(['']);
        }
      });
    }

    else {
      // update customer
      let customer: Customer = {
        id: this.customer?.id as string,
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        email: this.customerForm.value.email,
        address: this.customerForm.value.address,
        gender: this.customerForm.value.gender,
        image: this?.customer?.image as string,
        account: {
          accountNumber: this.customer?.account.accountNumber as string,
          type: this.customerForm.value.accountType,
          balance: parseFloat(this.customerForm.value.balance)
        }
      };

      this.customerService.updateCustomer(customer).subscribe({
        next: () => {
          this.router.navigate(['']);
        }
      });
    }

  }

  private generateRandomId(): string {

    // Generate a random string in the following format: "a0299050-7a99-4eab-8d42-d0bce08f0e85"
    let randomString = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    /*
      PS1: Normally, I would use a library like uuid to generate a random string, but I wanted to show you how to do it manually.
      PS2: I know that this is not the best way to generate a random string, but it is good enough for this example.
      PS3: Normally, we should check if the generated string is unique, but the chances of generating the same string twice are very very low.
    */

    return randomString;
  }
  private generateRandomImage(): string {
    // generate a random string in the following format: "https://robohash.org/theRandomString.png?size=100x100&set=set1"
    let randomString = 'https://robohash.org/' + this.generateRandomId() + '.png?size=100x100&set=set1';
    return randomString;
  }

  private generateRandomAccountNumber(): string {
    // generate a random string in the following format: "78569874512658"
    let randomString = Math.floor(Math.random() * 100000000000000).toString();
    return randomString;
  }

  public getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

}