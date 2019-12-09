import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';

import { Entries } from '../../models/entries.model';
import { NightscoutEntriesService } from '../../services/nightscout-entries.service';

@Component({
  selector: 'app-bg-three-hour',
  templateUrl: './bg-three-hour.component.html',
  styleUrls: ['./bg-three-hour.component.css']
})
export class BgThreeHourComponent implements OnInit {
  chartTitle: string = "3 HOUR TREND";
  nsData: Entries[] = [];
  isFetching: boolean = false;
  urlExtn: string = '/entries.json?count=36';

  public options: any = {
    chart: {
      type: 'line',
      height: 150,
    },
    title: {
      text: null
    },
    plotOptions: {
      series: {
        enableMouseTracking: false
      }
    },
    xAxis: {
      title: false,
      visible: false,
    },
    yAxis: {
      title: false,
      labels: false,
      visible: false
    },
    credits: {
      enabled: false
    },
    series: [
      {
        showInLegend: false,
        data: []
      }
    ]
  }

  constructor(private http: HttpClient , private nightscoutService: NightscoutEntriesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.getChartData();
  }

  onFetchData() {
    this.isFetching = true;
    this.nightscoutService.fetchData(this.nightscoutService.baseUrl + this.urlExtn)
      .subscribe(data => {
        this.isFetching = false;
        this.nsData = data;
        console.log(this.nsData);
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
    this.createChart(bgValues);
  }

  getChartData() {
    this.nightscoutService.fetchData(this.urlExtn).subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
      // return this.convertToBgValues(this.nsData);
      this.convertToBgValues(this.nsData);
    });  
  }

  createChart(data: number[]) {
    this.options.series[0]['data'] = data;
    Highcharts.chart('chartContainer', this.options);
  }

}
