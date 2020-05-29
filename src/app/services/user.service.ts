import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { UserInterface } from "src/app/models/user";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor
    (
      private http: HttpClient,
      public helperService: HelperService
    ) { }

  readUsers() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php?type=list`;
    return this.http.get<UserInterface>(url_api);
  }

  readCustomers() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php?type=listCliente`;
    return this.http.get<UserInterface>(url_api);
  }

  createUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

  searchUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

}
