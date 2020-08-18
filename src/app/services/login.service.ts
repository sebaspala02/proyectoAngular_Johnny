import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private router: Router
  ) { }

  logIn(postData: any) {
    const url = `http://localhost/taller1ElectivaII/controller/gestionLogin.php`;
    return this.http.post<any>(url, postData);
  }

  logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("nombreusuario");
    this.router.navigateByUrl("/login");
  }
}
