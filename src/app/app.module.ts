import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DateTimeComponent } from "./date-time/date-time.component";
import { DashComponent } from "./dash/dash.component";
import { BgComponent } from "./dash/bg/bg.component";
import { InsulinComponent } from "./dash/insulin/insulin.component";
import { CarbsComponent } from "./dash/carbs/carbs.component";
import { ChartComponent } from "./chart/chart.component";
import { ProfileComponent } from "./profile/profile.component";
import { BasalComponent } from "./basal/basal.component";
import { AppRoutingModule } from './app-routing.module';
import { BgOneDayComponent } from './chart/bg-one-day/bg-one-day.component';
import { BgThreeDayComponent } from './chart/bg-three-day/bg-three-day.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BgChartButtonsComponent } from './chart/bg-chart-buttons/bg-chart-buttons.component';
import { BgThreeHourComponent } from './chart/bg-three-hour/bg-three-hour.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DateTimeComponent,
    DashComponent,
    BgComponent,
    InsulinComponent,
    CarbsComponent,
    ChartComponent,
    ProfileComponent,
    BasalComponent,
    BgOneDayComponent,
    BgThreeDayComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    BgChartButtonsComponent,
    BgThreeHourComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
