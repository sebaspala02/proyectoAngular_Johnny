import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ShelfInterface } from '../models/shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  baseUrl = environment.baseUrl;

  constructor
    (
      private http: HttpClient,
      public helperService: HelperService
    ) { }

  readShelfs() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlEstante.php?type=list`;
    return this.http.get<ShelfInterface>(url_api);
  }

  createShelfs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlEstante.php`;
    return this.http.post<any>(url_api, postData);
  }

  searchShelfs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlEstante.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteShelfs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlEstante.php`;
    return this.http.post<any>(url_api, postData);
  }
}
