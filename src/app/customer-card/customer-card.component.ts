import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent {

  constructor(private router: Router) { }

  @Input() customer?: Customer;

  onUpdate() {
    this.router.navigate(['/editCustomer', this.customer?.id]);
  }
}
