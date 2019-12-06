import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bg-chart-buttons',
  templateUrl: './bg-chart-buttons.component.html',
  styleUrls: ['./bg-chart-buttons.component.css']
})
export class BgChartButtonsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  on1DayClicked() {
    this.router.navigate(['1day'], { relativeTo: this.route })
  }

  on3DaysClicked() {
    this.router.navigate(['3day'], { relativeTo: this.route })
  }

}
