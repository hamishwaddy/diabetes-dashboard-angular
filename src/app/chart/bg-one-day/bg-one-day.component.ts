import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { NightscoutEntriesService } from 'src/app/services/nightscout-entries.service';
import { Entries } from 'src/app/models/entries.model';

@Component({
  selector: 'app-bg-one-day',
  templateUrl: './bg-one-day.component.html',
  styleUrls: ['./bg-one-day.component.css']
})
export class BgOneDayComponent implements OnInit {
  title: string = 'LAST 24 HOURS'
  nsData: Entries[] = [];
  isFetching: boolean = false;
  // mmolValues: number[];
  urlExtn: string = '/entries.json?count=288';

  // fakeData: number[] = [12, 12.5, 12.8, 12.0, 11.4, 10.7, 10.2, 9.9, 9.8, 9.7, 9.6] 

  public options: any = {
    chart: {
      type: 'spline',
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
        return 'BG: ' + this.y + '\nTIME: ' + this.x;
        
      }
    },
    xAxis: {
      type: 'datetime',
      pointStart: new Date().getTime(),
      pointInterval: 24 * 3600 * 1000
    },
    yAxis: {
      title: {
        text: 'BG (mmol)'
      },
      endOnTick: false,
      min: 0,
      plotBands: [{ // Low BG
        from: 0.1,
        to: 3.9,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
            text: 'Low',
            style: {
                color: '#606060'
            }
        }
    }, { // In range
        from: 4.0,
        to: 13.5,
        color: 'rgba(0, 0, 0, 0)',
        label: {
            text: 'In range',
            style: {
                color: '#a1a1a1'
            }
        }
    },
    { // HIGH
      from: 13.6,
      to: 22.3,
      color: 'rgba(68, 170, 213, 0.1)',
      label: {
          text: 'High',
          style: {
              color: '#606060'
          }
      }
    }]
    },
    plotOptions: {
      spline: {
          lineWidth: 2,
          states: {
              hover: {
                  lineWidth: 3
              }
          },
          marker: {
              enabled: false
          },
          pointInterval: 3600000, // one hour
      }
  },
    series: [
      {
        name: 'BG Values',
        data: []
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
    this.nightscoutService.fetchData(this.urlExtn).subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
      // console.log(this.nsData);
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
    this.createChart(bgValues);
  }

  getChartData() {
    this.nightscoutService.fetchData(this.urlExtn).subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
      // let mmolArray: number[] = this.convertToBgValues(this.nsData);
      return this.convertToBgValues(this.nsData);
      // return mmolArray;
    });  
  }

  createChart(data: number[]) {
    this.options.series[0]['data'] = data;
    Highcharts.chart('container', this.options);
  }
}
