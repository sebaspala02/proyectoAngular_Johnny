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
