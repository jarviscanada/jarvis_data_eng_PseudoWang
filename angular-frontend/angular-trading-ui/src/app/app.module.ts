import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { TraderListComponent } from './trader-list/trader-list.component';
import { TraderAccountComponent } from './trader-account/trader-account.component';
import { TraderCreationComponent } from './trader-creation/trader-creation.component';
import { AmountDepositComponent } from './amount-deposit/amount-deposit.component';
import { AmountWithdrawComponent } from './amount-withdraw/amount-withdraw.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    QuotesListComponent,
    TraderListComponent,
    TraderAccountComponent,
    TraderCreationComponent,
    AmountDepositComponent,
    AmountWithdrawComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
