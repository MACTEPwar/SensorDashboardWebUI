import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapDashboardComponent } from './@_pages/map-dashboard/map-dashboard.component';
import { DefaultComponent } from './@_pages/default/default.component';


const routes: Routes = [
  { path: "", component: MapDashboardComponent },
  { path: "map", component: MapDashboardComponent },
  { path: "**", component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
