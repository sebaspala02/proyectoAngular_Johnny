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


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "navbar",
    component: NavbarComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "drug",
    component: DrugComponent
  },
  {
    path: "sale",
    component: SaleComponent
  },
  {
    path: "saleList",
    component: SaleListComponent
  },
  {
    path: "reportsCSV",
    component: ReportsCSVComponent
  },
  {
    path: "reportsC3",
    component: ReportsC3Component
  },
  {
    path: "C3",
    component: C3Component
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "profileClient",
    component: ProfileClientComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
