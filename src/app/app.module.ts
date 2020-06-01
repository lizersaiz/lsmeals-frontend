import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { NavbarMainComponent } from './components/navigation/navbar-main/navbar-main.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoBarComponent } from './components/miscelaneous/info-bar/info-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modal pop up component from ng bootstrap
import { NgbModalModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// modal popup component wrapper and templates
import { ModalPopupComponent, ModalPopupContent } from './components/miscelaneous/modal-popup/modal-popup.component';

import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { PasswordStrengthComponent } from './components/miscelaneous/password-strength/password-strength.component';
import { StatisticsView } from './components/statistics/statistics-view/statistics-view.component';
import { ChartComponent } from './components/miscelaneous/chart/chart.component';

// https://www.npmjs.com/package/angular-bootstrap-md
// npm i angular-bootstrap-md --save
// npm i @angular/cdk
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DatePickerComponent } from './components/miscelaneous/date-picker/date-picker.component';

// angular material paginator https://material.angular.io/components/paginator/api#PageEvent
import { MatPaginatorModule } from '@angular/material/paginator';
// angular material component wrapper
import { PaginatorComponent } from './components/miscelaneous/paginator/paginator.component';
import { CustomerWriteComponent } from './components/customer/customer-write/customer-write.component';

const routes: Routes = [
  // Info bar
  // {path: "", component: InfoBarComponent, outlet: "infoBar"},

  {path: "welcome", component:WelcomeComponent},
  {path: "meal/list", component:MealListComponent},
  {path: "customer/list", component:CustomerListComponent},
  {path: "customer/create", component:CustomerCreateComponent},
  {path: "customer/update/:customerId", component:CustomerUpdateComponent},
  {path: "statistics/view", component:StatisticsView},
  {path: "", component:WelcomeComponent},
  {path: "**", component:WelcomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarMainComponent,
    NavbarSideComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    InfoBarComponent,
    ModalPopupComponent,
    ModalPopupContent,
    CustomerCreateComponent,
    PasswordStrengthComponent,
    StatisticsView,
    ChartComponent,
    DatePickerComponent,
    PaginatorComponent,
    CustomerWriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModalModule,
    NgbDropdownModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatPaginatorModule,
    NgbModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
