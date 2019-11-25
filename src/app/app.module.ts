import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DateTimeComponent } from './date-time/date-time.component';
import { DashComponent } from './dash/dash.component';
import { BgComponent } from './dash/bg/bg.component';
import { InsulinComponent } from './dash/insulin/insulin.component';
import { CarbsComponent } from './dash/carbs/carbs.component';
import { ChartComponent } from './chart/chart.component';
import { ProfileComponent } from './profile/profile.component';
import { BasalComponent } from './basal/basal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DateTimeComponent, DashComponent, BgComponent, InsulinComponent, CarbsComponent, ChartComponent, ProfileComponent, BasalComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
