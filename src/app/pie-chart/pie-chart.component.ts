import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartPieData } from '../interfaces/ChartPieData.interface';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data?: ChartPieData;

  public canvas: any;
  public ctx: any;
  public chartPie: any;

  ngOnInit() {

  }

  ngOnChanges() {
    console.log(this.data?.chartId as string)
    let chartId = this.data?.chartId as string;
    this.canvas = document.getElementById(chartId);

    if (this.canvas) {
      const context = this.canvas.getContext('2d');
      this.ctx = this.canvas.getContext("2d");
      this.chartPie = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [this.data?.data1Name as string, this.data?.data2Name as string],
          datasets: [{
            label: this.data?.chartLabel,
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#03C988',
              '#19A7CE',
            ],
            borderWidth: 0,
            data: [this.data?.data1Value, this.data?.data2Value]
          }]
        },

        options: {

          legend: {
            display: false
          },


          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

    } else {
      console.error(`Element with ID '${chartId}' not found`);
    }

    console.log(this.data)
  }
}
