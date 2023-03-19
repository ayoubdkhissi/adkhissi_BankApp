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

  public isDeleteLoading: {id:string, isLoading:boolean}[] = [];
  

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

      // initialize isDeleteLoading
      this.isDeleteLoading = this.customers?.map(customer => {
        return {id: customer.id, isLoading: false};
      });
    });
  }


  onSearch(event: any) {
    this.searchTermSubject.next(event.target.value);
  }

  deleteCustomer(eventValue: any) {

    console.log("received delete event with id: " + eventValue)

    this.setIsDeleteLoading(eventValue, true);

    this.customerService.deleteCustomer(eventValue).subscribe({
      next: () => {
        this.customers = this.customers?.filter(customer => customer.id !== eventValue);
      }
    });
  }


  public getIsDeleteLoading(id: string) : boolean {
    return this.isDeleteLoading?.find(item => item.id === id)?.isLoading as boolean;
  }

  private setIsDeleteLoading(id: string, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading?.map(item => {
      if (item.id === id) {
        item.isLoading = isLoading;
      }
      return item;
    });
  }
}
