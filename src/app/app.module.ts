import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { DrugComponent } from './components/drug/drug.component';
import { SaleComponent } from './components/sale/sale.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { ReportsCSVComponent } from './components/reports-csv/reports-csv.component';
import { ReportsC3Component } from './components/reports-c3/reports-c3.component';
import { C3Component } from './components/c3/c3.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { SupplierComponent } from './components/supplier/supplier.component';

/*IMPORT NECESARIO PARA LAS PETICIONES HTTP*/
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { ShelfComponent } from './components/shelf/shelf.component';
import { CustomerComponent } from './components/customer/customer.component';

// import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UsersComponent,
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
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  // AuthService
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
