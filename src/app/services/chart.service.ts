// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// import { Entries } from '../models/entries.model';
// import { from } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChartService {
//   baseUrl: string = 'https://orriebetes.herokuapp.com/api/v1/';
//   entriesData: Entries [] = [];
//   bgValues: string[] = []; 

//   public options: any = {
//     chart: {
//       type: 'spline',
//       height: 300
//     },
//     title: {
//       text: this.title
//     },
//     credits: {
//       enabled: false
//     },
//     tooltip: {
//       formatter: function() {
//         return 'BG: ' + this.y + '\nTIME: ' + this.x;
        
//       }
//     },
//     xAxis: {
//       type: 'datetime',
//       pointStart: new Date().getTime(),
//       pointInterval: 24 * 3600 * 1000
//     },
//     yAxis: {
//       title: {
//         text: 'BG (mmol)'
//       },
//       min: 0,
//       plotBands: [{ // Low BG
//         from: 0.1,
//         to: 3.9,
//         color: 'rgba(68, 170, 213, 0.1)',
//         label: {
//             text: 'Low',
//             style: {
//                 color: '#606060'
//             }
//         }
//     }, { // In range
//         from: 4.0,
//         to: 13.5,
//         color: 'rgba(0, 0, 0, 0)',
//         label: {
//             text: 'In range',
//             style: {
//                 color: '#a1a1a1'
//             }
//         }
//     },
//     { // HIGH
//       from: 13.6,
//       to: 22.3,
//       color: 'rgba(68, 170, 213, 0.1)',
//       label: {
//           text: 'High',
//           style: {
//               color: '#606060'
//           }
//       }
//     }]
//     },
//     plotOptions: {
//       spline: {
//           lineWidth: 2,
//           states: {
//               hover: {
//                   lineWidth: 3
//               }
//           },
//           marker: {
//               enabled: false
//           },
//           pointInterval: 3600000, // one hour
//       }
//   },
//     series: [
//       {
//         name: 'BG Values',
//         data: []
//       }
//     ]
//   }

//   constructor() { }

//   renderBgChart() {

    
//   }
  



// }
