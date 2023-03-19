import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isDeleteLoading?: boolean = false;

  @Output() deleteCustomer = new EventEmitter<string>();

  onUpdate() {
    this.router.navigate(['/editCustomer', this.customer?.id]);
  }

  onDelete() {
    
    console.log("Emmiting delete event with id: " + this.customer?.id)
    this.deleteCustomer.emit(this.customer?.id);
  }
}
