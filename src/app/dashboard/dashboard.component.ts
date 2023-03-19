import { Component, OnChanges, OnInit } from '@angular/core';
import { ChartPieData } from '../interfaces/ChartPieData.interface';
import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnChanges {

  public customers?: Customer[];

  public chart1Data?: ChartPieData;
  public chart2Data?: ChartPieData;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    // initialize only ids of charts
    this.chart1Data = {
      chartId: 'chart1',
      chartTitle: '',
      chartSubTitle: '',
      chartDescription: '',
      chartLabel: '',
      data1Name: '',
      data1Value: 0,
      data2Name: '',
      data2Value: 0
    }
    this.chart2Data = {
      chartId: 'chart2',
      chartTitle: '',
      chartSubTitle: '',
      chartDescription: '',
      chartLabel: '',
      data1Name: '',
      data1Value: 0,
      data2Name: '',
      data2Value: 0
    }

    // get all customers and extract ChartData for accountTypes
    this.customerService.getCustomers()
      .subscribe({
        next: customers => {
          this.customers = customers;

          // number of customers per account type
          let [SavingsStats, CheckingStats] = this.customers.reduce((acc, customer) => {
            if(customer.account.type === 'Savings') {
              acc[0].count++;
              acc[0].totalBalance += customer.account.balance;
            } else {
              acc[1].count++;
              acc[1].totalBalance += customer.account.balance;
            }
            return acc;
          }, [{count: 0, totalBalance:0}, {count: 0, totalBalance:0}]);

          // Data for the first chart
          this.chart1Data = {
            chartId: 'chart1',
            chartTitle: 'Account Types',
            chartSubTitle: 'Savings vs Checking',
            chartDescription: 'Number of customers per account type',
            chartLabel: 'Account Type number',
            data1Name: 'Savings Number',
            data1Value: SavingsStats.count,
            data2Name: 'Checking Number',
            data2Value: CheckingStats.count
          }
          // Data for the second chart
          this.chart2Data = {
            chartId: 'chart2',
            chartTitle: 'Account Balance',
            chartSubTitle: 'Savings vs Checking',
            chartDescription: 'Total balance per account type',
            chartLabel: 'Account Type balance',
            data1Name: 'Savings Balance',
            data1Value: SavingsStats.totalBalance,
            data2Name: 'Checking Balance',
            data2Value: CheckingStats.totalBalance
          }
        }
      })
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

}
