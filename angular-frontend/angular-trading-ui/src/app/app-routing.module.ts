import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'trader-account', component: TraderAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
