import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entries } from '../models/entries.model'
import { Treatments } from '../models/treatments.model';

@Injectable({
  providedIn: 'root'
})
export class NightscoutEntriesService {
  baseUrl: string = 'https://orriebetes.herokuapp.com/api/v1/';
  entriesData: Entries [] = [];
  treatmentsData: Treatments [] = [];
  bgValues: string[] = []; 

  constructor(private http:HttpClient) { }

  fetchData(urlExtn: string) {
    return this.http.get<{ [key: string]: Entries }>(this.baseUrl + urlExtn)
    .pipe(
      map(responseData => {
      const entriesArray: Entries[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          entriesArray.push({ ...responseData[key], _id: key })
        }
      }
      this.entriesData = entriesArray;
      // console.log(this.entriesData);
      return this.entriesData;
    }));
  }

  fetchTreatmentsData(urlExtn: string) {
    return this.http.get<{ [key: string]: Treatments }>(this.baseUrl + urlExtn)
    .pipe(
      map(responseData => {
      const treatmentsArray: Treatments[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          treatmentsArray.push({ ...responseData[key], _id: key })
        }
      }
      this.treatmentsData = treatmentsArray;
      // console.log(this.entriesData);
      return this.treatmentsData;
    }));
  }


}
