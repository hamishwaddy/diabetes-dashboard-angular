import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgComponent } from './dash/bg/bg.component';
import { InsulinComponent } from './dash/insulin/insulin.component';
import { CarbsComponent } from './dash/carbs/carbs.component';
import { DashComponent } from './dash/dash.component';
import { ChartComponent } from './chart/chart.component';
import { BgOneDayComponent } from './chart/bg-one-day/bg-one-day.component';
import { BgThreeDayComponent } from './chart/bg-three-day/bg-three-day.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/bg', pathMatch: 'full' },
  { path: 'bg', component: DashComponent, children: [
    { path: '1day', component: BgOneDayComponent },
    { path: '3day', component: BgThreeDayComponent }
  ] },
  { path: 'insulin', component: DashComponent },
  { path: 'carbs', component: DashComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}