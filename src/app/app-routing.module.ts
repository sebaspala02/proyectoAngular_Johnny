import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
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
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { ShelfComponent } from './components/shelf/shelf.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BlockAccessGuard } from './guards/block-access.guard';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent, canActivate: [BlockAccessGuard]
  },
  {
    path: "navbar",
    component: NavbarComponent, canActivate: [BlockAccessGuard]
  },
  {
    path: "login",
    component: LoginComponent
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
    path: "footer",
    component: FooterComponent
  },
  {
    path: "",
    redirectTo: "login", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
