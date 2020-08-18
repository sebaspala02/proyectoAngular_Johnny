import { Component, OnInit } from '@angular/core';

import { UserInterface } from '../../models/user';
import { HelperService } from 'src/app/util/HelperService';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  users: UserInterface[] = [];
  usersData = {} as UserInterface;
  idusuario = null;

  constructor
    (
      public helperService: HelperService,
      public userService: UserService
    ) { }

  user: UserInterface;

  ngOnInit(): void {
    this.searchUser(16);
  }

  readUser() {

    /*Se llama al metodo de listar roles definido en el servicio*/
    this.userService.readUsers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.users = JSON.parse(respuesta.data);
        } else {
          this.users = [];
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

  searchUser(idusuario) {

    let postDataObj = new FormData();

    postDataObj.append("idusuario", idusuario);
    postDataObj.append("type", "search");

    // setea el id del usuario buscado
    // this.IDusuario = idusuario;
    this.idusuario = idusuario;

    this.userService.searchUsers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("la data bitch");
        // console.log(data);

        if (respuesta.msj === "Success") {

          // console.log("idsuaurio gino");
          // console.log(idusuario);

          this.helperService.openModal(true, "Success", "Encontrado exitosamente");
          this.usersData = JSON.parse(respuesta.data)[0];

          // console.log("userdata madier");
          // console.log(this.usersData);

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




  deleteUser() {

    // console.log("delete idusuario");
    // console.log(idusuario);

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idusuario", this.idusuario);
    postDataObj.append("type", "delete");

    this.userService.deleteUsers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Eliminado exitosamente");
          this.readUser();
          // this.cleanUser();
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

}
