import { Component, OnInit } from '@angular/core';

import { BgOneDayComponent } from './bg-one-day/bg-one-day.component'
import { BgThreeDayComponent } from './bg-three-day/bg-three-day.component'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
