import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  dateForm: FormGroup;
  get year() { return this.dateForm.get("year") };
  get month() { return this.dateForm.get("month") };
  // get day() { return this.dateForm.get("day") };

  years: string[];
  months: any[];
  days: string[];


  constructor() { }

  ngOnInit(): void {

    // TODO retrieve years from the DB
    this.years = ["", "2019", "2020", "2021"];
    this.months = [{index: undefined, value: "", days: ""},
                  {index: 1, value: "January", days: 31},
                  {index: 2, value: "February", days: 28},
                  {index: 3, value: "March", days: 31},
                  {index: 4, value: "April", days: 30},
                  {index: 5, value:  "May", days: 31},
                  {index: 6, value: "June", days: 30},
                  {index: 7, value: "July", days: 31},
                  {index: 8, value: "August", days: 31},
                  {index: 9, value: "September", days: 30},
                  {index: 10, value: "October", days: 31},
                  {index: 11, value: "November", days: 30},
                  {index: 12, value: "December", days: 31}];
    this.days = [];

    this.dateForm = new FormGroup({
      'year': new FormControl("", Validators.required),
      'month': new FormControl("", Validators.required),
      //'day': new FormControl(""),
    })
  }

  getDate(){

    if (this.year.valid){
      return {year: this.year.value, month: this.month.value.index, days: this.month.value.days}
    }
    return false;
  }
}
