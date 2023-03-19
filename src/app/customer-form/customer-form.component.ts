import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public customer?: Customer;

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.customerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', ],
      address: [''],
      gender: [''],
      accountType: [''],
      balance: ['']
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
          balance: this.customerForm.value.accountBalance
        }
      };

      console.log(customer);

      this.customerService.addCustomer(customer).subscribe({
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

    // check if the random string is already used
    this.customerService.getCustomerById(randomString).subscribe({
      next: (c) => {
        // if the id is already used, try generate a new one
        if (c) {
          this.generateRandomId();
        }
      },
      error: (err) => {
        // if the id is not used, return the random string
        return randomString;
      }
    });

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

}