import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { LabInterface } from '../models/laboratory';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  baseUrl = environment.baseUrl;

  constructor
    (
      private http: HttpClient,
      public helperService: HelperService
    ) { }

  readLabs() {
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlLaboratorio.php?type=list`;
    return this.http.get<LabInterface>(url_api);
  }

  createLabs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlLaboratorio.php`;
    return this.http.post<any>(url_api, postData);
  }

  searchLabs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlLaboratorio.php`;
    return this.http.post<any>(url_api, postData);
  }

  deleteLabs(postData: any) {
    postData.append('token', this.helperService.generarToken());
    const url_api = `http://localhost/taller1ElectivaII/controller/ctlLaboratorio.php`;
    return this.http.post<any>(url_api, postData);
  }

}
