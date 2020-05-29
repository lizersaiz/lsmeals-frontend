import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  // chart properties
  chartType: Subject<string> = new Subject<string>();
  chartDatasets: Subject<any[]> = new Subject<any[]>();
  chartLabels: Subject<string[]> = new Subject<string[]>();
  chartColors: Subject<any[]> = new Subject<any[]>();
  chartOptions: Subject<any> = new Subject<any>();
  legend: Subject<boolean> = new Subject<boolean>();

  // the DB table to look at
  subject: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }


  configureChart(subject: string, date: any){

    this.chartType.next("bar");

    this.getDataset(subject, date);

    this.setLabels(date);

    this.chartColors.next(
      [
        {
          backgroundColor: 'rgba(220,220,220,0.2)',
          borderColor: 'rgba(220,220,220,1)',
          borderWidth: 2,
          /*
          pointBackgroundColor: 'rgba(220,220,220,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)'
          */
        }
      ]
    );

    let options ={
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'rgba(255,255,255,1)'
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            fontColor: 'rgba(255,255,255,1)'
          }
        }],
        legend: [{
          labels: {
            fontColor: 'rgba(255,255,255,1)'
          }
        }],
      }
    }
    this.chartOptions.next(options);

    this.legend.next(false);
  }

  getDataset(subject: string, date: any){

    let response: any[];

    this.getDataSetHttp(subject, date.year, date.month).subscribe(

      (data) => response = data,

      (error) => console.log(error),

      () => (this.extractDataSet(response, date.year, date.month, date.days))
    );
  }

  // TODO change this with the API, this part is not elegant at all
  getDataSetHttp(subject: string, year: number, month: number): Observable<any[]>{

    let url = 'http://localhost:8080/api/deliveries/search';
    if (subject === "Deliveries"){
      if (month !== undefined){
        url += `/deliveryCountByYearAndMonth?year=${year}&month=${month}`
      }
      else{
        url += `/deliveryCountByYear?year=${year}`
      }
    }

    return this.httpClient.get<any[]>(url);
  }

  // TODO change this as will be getting better shaped request in the future
  extractDataSet(response: any[], year: string, month: number, days: number){

    // response final form
    let builtArray: number[] = [];
    // for accessing the response
    let responseIndex = 0;
    // shapes the for loop depending on having month as filter
    let forLimit = (month !== undefined) ? days : 12;

    // loop in the response as we template our data
    for (let i = 0 ; i < forLimit ; i++) {

      // check for not having an array out of bounds exc
      let chartX = 0;
      if (responseIndex < response.length){

        chartX = response[responseIndex][1];
      }

      // we want to fill the array with the next value retrieved,
      // if it doesn´t have a value, builtArray will have a 0
      if (chartX === i+1){

        builtArray.push(response[responseIndex][0]);
        responseIndex++;
      }
      else{

        builtArray.push(0);
      }
    }

    // give our dataSet an extra property "label" for MDB
    let dataSet = [{data: builtArray, label: "label"},]
    this.chartDatasets.next(dataSet);
  }

  setLabels(date: any){

    if (date.month === undefined){

      this.chartLabels.next(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    }
    else{

      let dayLabels: string[] = [];
      for (let i = 1 ; i <= date.days ; i++){

        dayLabels.push(""+i);
      }

      this.chartLabels.next(dayLabels);
    }
  }
}
