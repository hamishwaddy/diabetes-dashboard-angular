import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { NightscoutEntriesService } from 'src/app/services/nightscout-entries.service';
import { Entries } from 'src/app/models/entries.model';

@Component({
  selector: 'app-bg-three-day',
  templateUrl: './bg-three-day.component.html',
  styleUrls: ['./bg-three-day.component.css']
})
export class BgThreeDayComponent implements OnInit {
  title: string = 'BG TREND: LAST 3 DAYS'
  nsData: Entries[] = [];
  isFetching: boolean = false;
  bgValuesArray = [];
  timesArray = [];
  urlExtn: string = '/entries.json?count=864';

//   fakeData = [
//     [Date.UTC(1970, 10, 25), 0],
//     [Date.UTC(1970, 11,  6), 0.25],
//     [Date.UTC(1970, 11, 20), 1.41],
//     [Date.UTC(1970, 11, 25), 1.64],
//     [Date.UTC(1971, 0,  4), 1.6],
//     [Date.UTC(1971, 0, 17), 2.55],
//     [Date.UTC(1971, 0, 24), 2.62],
//     [Date.UTC(1971, 1,  4), 2.5],
//     [Date.UTC(1971, 1, 14), 2.42],
//     [Date.UTC(1971, 2,  6), 2.74],
//     [Date.UTC(1971, 2, 14), 2.62],
//     [Date.UTC(1971, 2, 24), 2.6],
//     [Date.UTC(1971, 3,  1), 2.81],
//     [Date.UTC(1971, 3, 11), 2.63],
//     [Date.UTC(1971, 3, 27), 2.77],
//     [Date.UTC(1971, 4,  4), 2.68],
//     [Date.UTC(1971, 4,  9), 2.56],
//     [Date.UTC(1971, 4, 14), 2.39],
//     [Date.UTC(1971, 4, 19), 2.3],
//     [Date.UTC(1971, 5,  4), 2],
//     [Date.UTC(1971, 5,  9), 1.85],
//     [Date.UTC(1971, 5, 14), 1.49],
//     [Date.UTC(1971, 5, 19), 1.27],
//     [Date.UTC(1971, 5, 24), 0.99],
//     [Date.UTC(1971, 5, 29), 0.67],
//     [Date.UTC(1971, 6,  3), 0.18],
//     [Date.UTC(1971, 6,  4), 0]
// ]

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
        return 'BG: ' + this.y;
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
          // pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
          // pointStart: Date.UTC(this.nsData[288].sysTime.getUTCDay())
          // pointStart: this.nsData[288].sysTime.toString()
      }
  },
    series: [
      {
        name: 'BG Values',
        data: this.bgValuesArray
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
    let bgValues = [];
    let times = [];
    let sgvValue;
    let bgValue;
    let time;
    for (var i = 0; i < data.length; i++) {
      time = data[i].sysTime;
      sgvValue = data[i].sgv;
      bgValue = +(sgvValue / 18).toFixed(1);

      times.push(time);
      bgValues.push(bgValue);
    }
    this.timesArray = times;
    this.bgValuesArray = bgValues;
    
    this.createChart(bgValues);
    // return bgValues = this.bgValues;
  }

  getChartData() {
    this.nightscoutService.fetchData().subscribe(data => {
      this.isFetching = false;
      this.nsData = data;
      // let bgArray = this.convertToBgValues(this.nsData);
      this.convertToBgValues(this.nsData);
    });  
  }

  createChart(data: number[]) {
    this.options.series[0]['data'] = data;
    // this.options.xAxis[0]['categories'] = categories;
    Highcharts.chart('container', this.options);
  }
  
}
