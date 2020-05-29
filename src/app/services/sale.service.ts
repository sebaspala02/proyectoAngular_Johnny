import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { SaleInterface } from "src/app/models/sale";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  baseUrl = environment.baseUrl;

  constructor
    (
      private http: HttpClient,
      public helperService: HelperService
    ) { }
    listProducts() {
      const url_api = `http://localhost/taller1ElectivaII/controller/ctlMedi.php?type=list`;
      return this.http.get<SaleInterface>(url_api);
    }
    listCustomers() {
      const url_api = `http://localhost/taller1ElectivaII/controller/ctlCliente.php?type=list`;
      return this.http.get<SaleInterface>(url_api);
    }
    createSale(postData: any) {
      const url_api = `http://localhost/taller1ElectivaII/controller/ctlDetalle.php`;
      return this.http.post<any>(url_api, postData);
    }

  readUsers() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlVenta.php?type=list`;
    return this.http.get<SaleInterface>(url_api);
  }

  createUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlVenta.php`;
    return this.http.post<any>(url_api, postData);
  }

  searchUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlVenta.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteUsers(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlVenta.php`;
    return this.http.post<any>(url_api, postData);
  }

}
