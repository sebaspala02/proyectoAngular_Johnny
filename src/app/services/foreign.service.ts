import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { TypeUserInterface } from '../models/typeUser';

@Injectable({
  providedIn: 'root'
})
export class ForeignService {

  constructor
    (
      private http: HttpClient, public helperService: HelperService
    ) { }

  foreignTypeUsers() {
    return this.http.get<TypeUserInterface>("http://localhost/taller1ElectivaII/controller/ctlList.php?type=loadListTipoUsuarios"
    );
  }
}
