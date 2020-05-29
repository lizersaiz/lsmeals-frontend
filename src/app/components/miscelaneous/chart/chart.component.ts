import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartType: string ;
  chartDatasets: any[];
  chartLabels: string[];
  chartColors: any[];
  chartOptions: any;
  legend: boolean;

  chartIsConfigured: boolean = false;

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {

    this.chartService.chartType.subscribe(
      data => {
        this.chartType = data;
      }
    )
    this.chartService.chartDatasets.subscribe(
      data => {
        this.chartDatasets = data;
        this.chartIsConfigured = true;
      }
    )
    this.chartService.chartLabels.subscribe(
      data => this.chartLabels = data
    )
    this.chartService.chartColors.subscribe(
      data => this.chartColors = data
    )
    this.chartService.chartOptions.subscribe(
      data => this.chartOptions = data
    )
    this.chartService.legend.subscribe(
      data => this.legend = data
    )
  }

  refreshData(chartType: string, chartDatasets: any[], chartLabels: string[], chartColors: any[], chartOptions: any, legend: boolean){
    this.chartType = chartType;
    this.chartDatasets = chartDatasets;
    this.chartLabels = chartLabels;
    this.chartColors = chartColors;
    this.chartOptions = chartOptions;
    this.legend = legend;
  }

  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }
}
