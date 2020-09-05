import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { UsersComponent } from './users/users.component';
import { DrugComponent } from './drug/drug.component';
import { SaleComponent } from './sale/sale.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { ReportsCSVComponent } from './reports-csv/reports-csv.component';
import { ReportsC3Component } from './reports-c3/reports-c3.component';
import { C3Component } from './c3/c3.component';
import { ProfileComponent } from './profile/profile.component';
import { Page404Component } from './page404/page404.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { SupplierComponent } from './supplier/supplier.component';
import { HomeComponent } from './home/home.component';

/*IMPORT NECESARIO PARA LAS PETICIONES HTTP*/
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ShelfComponent } from './shelf/shelf.component';
import { CustomerComponent } from './customer/customer.component';

import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UsersComponent,
    DrugComponent,
    SaleComponent,
    SaleListComponent,
    ReportsCSVComponent,
    ReportsC3Component,
    C3Component,
    ProfileComponent,
    Page404Component,
    ProfileClientComponent,
    SupplierComponent,
    LaboratoryComponent,
    ShelfComponent,
    CustomerComponent,
    HomeComponent,
    PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    DataTablesModule,
    TranslateModule
  ],
  providers: [HttpClientModule]
})
export class PagesModule { }
