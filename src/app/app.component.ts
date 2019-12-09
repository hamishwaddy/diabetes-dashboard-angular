import { Component, OnInit } from "@angular/core";
import { NightscoutEntriesService } from './services/nightscout-entries.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "iDot Tracker Dashboard App";

  constructor(private nightscoutService:NightscoutEntriesService) { }

  ngOnInit() {
    this.nightscoutService.fetchData(null);
  }
}
