import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';


const API_URL = "http://localhost:3000/customers"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public getCustomers() : Observable<Customer[]> {
    let url = `${API_URL}`;
    return this.httpClient.get<Customer[]>(url);
  }

  public searchCustomers(searchTerm: string) : Observable<Customer[]> {
    let url = `${API_URL}?q=${searchTerm}`;
    return this.httpClient.get<Customer[]>(url);
  }

  public getCustomerById(id: string) : Observable<Customer> {
    let url = `${API_URL}/${id}`;
    return this.httpClient.get<Customer>(url);
  }

  public addCustomer(customer: Customer) : Observable<Customer> {
    let url = `${API_URL}`;
    return this.httpClient.post<Customer>(url, customer);
  }


}
