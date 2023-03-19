import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  {
    path: 'addCustomer',
    component: CustomerFormComponent,
    data: {isAddMode: true}
  },
  {
    path: 'editCustomer/:id',
    component: CustomerFormComponent,
    data: {isAddMode: false}
  },
  {
    path: 'notFound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'notFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
