import { Component, OnInit } from '@angular/core';
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

  //public isAddMode: boolean = true;

  public customer?: Customer;

  constructor(private route: ActivatedRoute, 
    private customerService: CustomerService,
    private router: Router) { 

  }

  ngOnInit(): void {

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
                  this.router.navigate(['/']);
                }
              });

        });
  }

  

  logCustomer(){
    console.log(this.customer);
  }
}
