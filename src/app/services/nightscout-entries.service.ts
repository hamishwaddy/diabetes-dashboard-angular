import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entries } from '../models/entries.model'

@Injectable({
  providedIn: 'root'
})
export class NightscoutEntriesService {
  baseUrl: string = 'https://orriebetes.herokuapp.com/api/v1/entries.json?count=288';
  entriesData: Entries [] = [];
  bgValues: string[] = []; 

  constructor(private http:HttpClient) { }

  fetchData() {
    return this.http.get<{ [key: string]: Entries }>(this.baseUrl)
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
    // .subscribe(data => {
    //   this.entriesData = data;
    // });
  }

  // getBgValues() {
  //   const data = this.entriesData;
  //   const bgValues: string[] = [];
  //   let sgvValue: number;
  //   let bgValue: string;
  //   console.log(data);
  //   for (var i = 0; i < this.entriesData.length; i++) {
  //     sgvValue = this.entriesData[i].sgv;
  //     bgValue = (sgvValue / 18).toFixed(1);
  //     bgValues.push(bgValue)
  //   }
  //   console.log(this.bgValues);
  //   return this.bgValues = bgValues;
  // }


}
