import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  myDate = new Date();

  /*Configuracion modal*/
  modalTitle: string;
  modalContent: string;
  modalOpen = false;
  /*END Configuracion modal*/

  constructor(private datePipe: DatePipe) { }

  public generarToken() {
    let fechaActual = this.datePipe.transform(this.myDate, 'dd/MM/yyy');
    let palabraClave = 'eAm';
    let token = palabraClave + fechaActual;
    const md5 = new Md5();
    let tokenApp = md5.appendStr(token).end();
    return tokenApp;
  }

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

  /******************LOCAL STORAGE***********************************/

  public saveLocalData(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  public getLocalData(name: string) {
    return localStorage.getItem(name);
  }

  public deleteLocalData(name: string) {
    localStorage.removeItem(name);
  }

  public existLocalData(name: string) {
    if (this.isValidValue(this.getLocalData(name))) {
      return true;
    } else {
      return false;
    }
  }

  /******************END LOCAL STORAGE***********************************/


  public mappingObjectToForm(obj: any) {

    let postDataObj = new FormData();

    for (var key in obj) {
      postDataObj.append(key, obj[key]);
    }
    return postDataObj;
  }
}
