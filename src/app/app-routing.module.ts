import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { Page404Component } from './pages/page404/page404.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "*", component: Page404Component},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }