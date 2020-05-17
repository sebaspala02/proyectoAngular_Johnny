import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/util/HelperService';
import { UserInterface } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: UserInterface[] = [];
  usuariosData = {} as UserInterface;

  constructor
    (
      public helperService: HelperService,
      public userService: UserService
    ) { }

  // public user: UserInterface = {
  //   idusuario: 1,
  //   cedula: null,
  //   nombre: "",
  //   apellido: "",
  //   correo: "",
  //   usuario: "",
  //   password: null
  // };

  ngOnInit(): void {
    this.listarUser();
  }

  listarUser() {

    /*Se llama al metodo de listar roles definido en el servicio*/
    this.userService.listarUsers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.usuarios = JSON.parse(respuesta.data);
        } else {
          this.usuarios = [];
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  guardarUsuario() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idusuario", this.usuariosData.idusuario + ' ');
    postDataObj.append("cedula", this.usuariosData.cedula + ' ');
    postDataObj.append("nombre", this.usuariosData.nombre);
    postDataObj.append("apellido", this.usuariosData.apellido);
    postDataObj.append("correo", this.usuariosData.correo);
    postDataObj.append("usuario", this.usuariosData.usuario);
    postDataObj.append("password", this.usuariosData.password + ' ');

    if (this.helperService.isValidValue(this.usuariosData.idusuario + ' ')) {
      postDataObj.append("type", "save");
    } else {
      postDataObj.append("type", "update");
    }

    this.userService.guardarUsers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarUser();
          // this.limpiarEstudiante();
          location.reload();
        } else {
          this.helperService.openModal(
            true,
            "Info",
            "No se detecto ningun cambio en la base de datos"
          );
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  buscarUsuario() {

    let postDataObj = new FormData();

    postDataObj.append("idusuario", this.usuariosData.idusuario + '');
    postDataObj.append("type", "search");

    this.userService.buscarUsers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.usuariosData = JSON.parse(respuesta.data)[0];
        } else {
          this.helperService.openModal(true, "Info", "No se encontro");
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }




  eliminarUsuario() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idusuario", this.usuariosData.idusuario + '');

    postDataObj.append("type", "delete");

    this.userService.eliminarUsers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarUser();
          // this.limpiarEstudiante();
          location.reload();
        } else {
          this.helperService.openModal(
            true,
            "Info",
            "No se encontro el registro a eliminar"
          );
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }

}
