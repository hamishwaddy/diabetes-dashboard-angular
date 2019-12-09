import { Component, OnInit } from '@angular/core';
import { NightscoutEntriesService } from 'src/app/services/nightscout-entries.service';
import { Treatments } from 'src/app/models/treatments.model';

@Component({
  selector: 'app-insulin',
  templateUrl: './insulin.component.html',
  styleUrls: ['./insulin.component.css']
})
export class InsulinComponent implements OnInit {
  urlExtn: string = 'treatments.json'
  treatmentsData: Treatments[] = [];
  isFetching: boolean = false;

  constructor(private nightscoutService: NightscoutEntriesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.addTodaysInsulin(this.treatmentsData);
  }

  onFetchData() {
    this.nightscoutService.fetchTreatmentsData(this.urlExtn).subscribe(data => {
      this.isFetching = false;
      this.treatmentsData = data;
    });
  }

  addTodaysInsulin(data: Treatments[]) {
    this.nightscoutService.fetchTreatmentsData(this.urlExtn).subscribe(data => {
    this.isFetching = false;
    let todaysDate = new Date().toUTCString();
    console.log(data)
    for (var i = 0; i < data.length; i++ ) {
      const dosageTime = data[i].sysTime.toUTCString();
      const dose = data[i].insulin;
      // let insulinData: number = 0;
      // if (todaysDate === dosageTime) {
      //   insulinData += dose;
      // }
      console.log(dose);

    }
    })
  
  }

}
