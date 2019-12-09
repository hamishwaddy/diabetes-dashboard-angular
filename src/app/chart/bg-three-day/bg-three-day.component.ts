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
  title: string = 'LAST 3 DAYS'
  nsData: Entries[] = [];
  isFetching: boolean = false;
  bgValuesArray = [];
  timesArray = [];
  urlExtn: string = '/entries.json?count=864';

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
  constructor(private nightscoutService:NightscoutEntriesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.getChartData();
  }

  onFetchData() {
    this.isFetching = true;
    this.nightscoutService.fetchData(this.urlExtn).subscribe(data => {
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
    this.bgValuesArray = bgValues.reverse();
    
    this.createChart(this.bgValuesArray);
    // return bgValues = this.bgValues;
  }

  getChartData() {
    this.nightscoutService.fetchData(this.urlExtn).subscribe(data => {
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
