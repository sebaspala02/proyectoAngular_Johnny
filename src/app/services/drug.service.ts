import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { DrugInterface } from '../models/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor
    (
      private http: HttpClient,
      public helperService: HelperService
    ) { }

  readDrugs() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlMedi.php?type=list`;
    return this.http.get<DrugInterface>(url_api);
  }

  searchDrugs(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlMedi.php`;
    return this.http.post<any>(url_api, postData);
  }

  createDrugs(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlMedi.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteDrugs(postData: any) {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlMedi.php`;
    return this.http.post<any>(url_api, postData);
  }
}
