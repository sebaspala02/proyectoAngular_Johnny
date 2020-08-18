import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
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
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ShelfComponent } from './shelf/shelf.component';
import { CustomerComponent } from './customer/customer.component';
import { BlockAccessGuard } from '../guards/block-access.guard';
import { PagesComponent } from './pages.component';


const routes: Routes = [

  {
    path: 'drugsonline', component: PagesComponent,
    children: [
      {
        path: "home",
        component: HomeComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "users",
        component: UsersComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "drug",
        component: DrugComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "sale",
        component: SaleComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "saleList",
        component: SaleListComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "reportsCSV",
        component: ReportsCSVComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "reportsC3",
        component: ReportsC3Component, canActivate: [BlockAccessGuard]
      },
      {
        path: "C3",
        component: C3Component, canActivate: [BlockAccessGuard]
      },
      {
        path: "profile",
        component: ProfileComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "profileClient",
        component: ProfileClientComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "laboratory",
        component: LaboratoryComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "shelf",
        component: ShelfComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "suppliers",
        component: SupplierComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "customer",
        component: CustomerComponent, canActivate: [BlockAccessGuard]
      },
      {
        path: "*",
        component: Page404Component
      },
      {
        path: "",
        redirectTo: "login", pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
