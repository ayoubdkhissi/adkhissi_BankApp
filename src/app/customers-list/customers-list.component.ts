import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';
import { CustomerService as CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {


  public customers? : Customer[];

  public searchTermSubject = new Subject<string>();
  

  constructor(private customerService: CustomerService) {
    this.searchTermSubject
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((searchTerm : string) => { 
          this.customerService
              .searchCustomers(searchTerm)
              .subscribe(customers => this.customers = customers);
        });
   }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }


  onSearch(event: any) {
    this.searchTermSubject.next(event.target.value);
  }
}
