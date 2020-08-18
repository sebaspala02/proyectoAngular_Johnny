import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/util/HelperService';
import { error } from '@angular/compiler/src/util';
import { ShelfInterface } from '../../models/shelf';
import { ShelfService } from '../../services/shelf.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  shelfs: ShelfInterface[] = [];
  shelfsData = {} as ShelfInterface;
  idestante = null;

  constructor
    (
      public helperService: HelperService,
      public shelfService: ShelfService
    ) { }

  ngOnInit(): void {
    this.readShelf();
  }

  readShelf() {

    /*Se llama al metodo de listar roles definido en el servicio*/
    this.shelfService.readShelfs().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.shelfs = JSON.parse(respuesta.data);
        } else {
          this.shelfs = [];
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Danger",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  createShelf() {

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idestante", this.shelfsData.idestante);
    postDataObj.append("codigo", this.shelfsData.codigo);
    postDataObj.append("categoria", this.shelfsData.categoria);
    postDataObj.append("descripcion", this.shelfsData.descripcion);

    if (this.helperService.isValidValue(this.shelfsData.idestante)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.shelfService.createShelfs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        console.log("la data");
        console.log(data);
        console.log("la repuesta");
        console.log(respuesta.data);

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Guardado exitosamente");
          this.readShelf();
          // this.cleanShelf();
          location.reload();
        } else {
          this.helperService.openModal(
            true,
            "Danger",
            "No se detecto ningun cambio en la base de datos"
          );
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Danger",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  searchShelf(idestante) {


    let postDataObj = new FormData();

    postDataObj.append("idestante", idestante);
    postDataObj.append("type", "search");

    // setea el id del usuario buscado
    // this.idestante = idestante;
    this.idestante = idestante;

    this.shelfService.searchShelfs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("la data bitch");
        // console.log(data);

        if (respuesta.msj === "Success") {

          // console.log("idsuaurio gino");
          // console.log(idestante);

          this.helperService.openModal(true, "Success", "Encontrado exitosamente");
          this.shelfsData = JSON.parse(respuesta.data)[0];

          // console.log("Shelfdata madier");
          // console.log(this.ShelfsData);

        } else {
          this.helperService.openModal(true, "Danger", "No se encontro");
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Danger",
          "Error consumiendo el servicio"
        );
      }
    );
  }




  deleteShelf() {

    // console.log("delete idestante");
    // console.log(idestante);

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idestante", this.idestante);
    postDataObj.append("type", "delete");

    this.shelfService.deleteShelfs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Eliminado exitosamente");
          this.readShelf();
          // this.cleanShelf();
          location.reload();
        } else {
          this.helperService.openModal(
            true,
            "Danger",
            "No se encontro el registro a eliminar"
          );
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Danger",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  cleanShelf() {
    this.idestante = null;
    this.shelfsData = {} as ShelfInterface;
  }

}
