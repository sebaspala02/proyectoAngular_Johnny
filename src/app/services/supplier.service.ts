import { Injectable } from "@angular/core";

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { SupplierInterface } from 'src/app/models/supplier'
@Injectable({
  providedIn: "root",
})
export class SupplierService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) {}

  listSuppliers() {
    // return this.http.get<SupplierInterface>(
    //   this.baseUrl + "/controller/ctlProveedor.php?type=list"
    // );

    const url_api = `http://localhost/taller1ElectivaII/controller/ctlProveedor.php?type=list`;
    return this.http.get<SupplierInterface>(url_api);
  }

  saveSuppliers(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlProveedor.php`;
    return this.http.post<any>(url_api, postData);
  }

  findSuppliers(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlProveedor.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteSuplliers(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlProveedor.php`;
    return this.http.post<any>(url_api, postData);
  }
}
