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

  listarUsers() {

    // return this.http.get<UserInterface>(
    //   this.baseUrl + "/controller/ctlUsuario.php?type=list"
    // );

    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php?type=list`;
    return this.http.get<UserInterface>(url_api);

  }

  guardarUsers(postData: any) {

    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

  buscarUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

  eliminarUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlUsuario.php`;
    return this.http.post<any>(url_api, postData);
  }

}
