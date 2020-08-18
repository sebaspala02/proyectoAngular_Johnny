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

  foreignUsers() {
    return this.http.get<TypeUserInterface>("http://localhost/taller1ElectivaII/controller/ctlList.php?type=loadListUsuarios"
    );
  }

  foreignLabs() {
    return this.http.get<TypeUserInterface>("http://localhost/taller1ElectivaII/controller/ctlList.php?type=loadListLabs"
    );
  }

  foreignSuppliers() {
    return this.http.get<TypeUserInterface>("http://localhost/taller1ElectivaII/controller/ctlList.php?type=loadListSuppliers"
    );
  }

  foreignShelfs() {
    return this.http.get<TypeUserInterface>("http://localhost/taller1ElectivaII/controller/ctlList.php?type=loadListShelf"
    );
  }
}
