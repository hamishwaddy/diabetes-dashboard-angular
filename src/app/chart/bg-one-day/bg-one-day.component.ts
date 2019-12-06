import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { NightscoutEntriesService } from 'src/app/services/nightscout-entries.service';
import { Entries } from 'src/app/models/entries.model';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-bg-one-day',
  templateUrl: './bg-one-day.component.html',
  styleUrls: ['./bg-one-day.component.css']
})
export class BgOneDayComponent implements OnInit {
  title: string = 'BG TREND: Last 24 hours'
  nsData: Entries[] = [];
  isFetching: boolean = false;
  bgValues: number[];
  urlExtn: string = '/entries.json?count=288';

  // fakeData: number[] = [12, 12.5, 12.8, 12.0, 11.4, 10.7, 10.2, 9.9, 9.8, 9.7, 9.6] 

  public options: any = {
    chart: {
      type: 'line',
      height: 300
    },
    title: {
      text: this.title
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'BG: ' + this.y;
      }
    },
    xAxis: {
      categories: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '00']
    },
    series: [
      {
        name: 'BG Values',
        data: [this.bgValues]
      }
    ]
  }
  subscription: Subscription;
  constructor(private http: HttpClient, private nightscoutService:NightscoutEntriesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.getChartData();
  }

  onFetchData() {
    this.isFetching = true;
    this.nightscoutService.fetchData().subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
    });
  }

  convertToBgValues(data: Entries[]) {
    let bgValues: number[] = [];
    let sgvValue: number;
    let bgValue: number;
    for (var i = 0; i < data.length; i++) {
      sgvValue = data[i].sgv;
      bgValue = +(sgvValue / 18).toFixed(1);
      bgValues.push(bgValue)
    }
    bgValues.reverse();
    // console.log(bgValues);
    this.createChart();
    return bgValues = this.bgValues;
  }

  getChartData() {
    this.nightscoutService.fetchData().subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
      let bgArray: number[] = this.convertToBgValues(this.nsData);
    });  
  }

  createChart() {
    // this.options.series[0]['data'] = data;
    Highcharts.chart('container', this.options);
  }
}
