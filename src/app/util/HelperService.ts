import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  /*Configuracion modal*/
  modalTitle: string;
  modalContent: string;
  modalOpen = false;
  /*END Configuracion modal*/

  constructor() { }


  isValidValue(val: string) {

    if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null' && val !== '') {
      return true;
    } else {
      return false;
    }
  }


  openModal(open: boolean, title?: string, content?: string): void {
    this.modalTitle = title;
    this.modalContent = content;
    this.modalOpen = open;
  }


}
