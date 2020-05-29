import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartService } from 'src/app/services/chart.service';
import { DatePickerComponent } from '../../miscelaneous/date-picker/date-picker.component';

@Component({
  selector: 'app-statistics-view',
  templateUrl: './statistics-view.component.html',
  styleUrls: ['./statistics-view.component.css']
})
export class StatisticsView implements OnInit {

  customerStatistics: FormGroup;
  get subjectSelector() { return this.customerStatistics.get("subjectSelector") };
  subjectSelectorOpts: any;

  @ViewChild('datePicker') datePicker: DatePickerComponent;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {

    this.customerStatistics = new FormGroup({
      'subjectSelector': new FormControl(""),
    });
    this.subjectSelectorOpts = [  { id:"0", name:""},
                                  { id:"1", name:"Deliveries"},
                                  { id:"2", name:"Meals"},
                                  { id:"3", name:"Ratings"} ];
  }

  configureChart(){

    if (this.datePicker !== undefined){

      let date = this.datePicker.getDate();
      if (date){

        this.chartService.configureChart(this.subjectSelector.value, this.datePicker.getDate());
      }
    }
  }
}
