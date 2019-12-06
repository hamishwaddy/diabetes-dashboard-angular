import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {
  time: string = moment().format('LT').toString();
  date: string = moment().format('LL').toString();

  constructor() { }

  ngOnInit() {
  }

}
