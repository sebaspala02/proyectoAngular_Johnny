import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/util/HelperService';
import { UserInterface } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { error } from '@angular/compiler/src/util';
import { ForeignService } from '../../services/foreign.service';
import { TypeUserInterface } from '../../models/typeUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  // public IDusuario = null;

  users: UserInterface[] = [];
  usersData = {} as UserInterface;
  idusuario = null;

  typeUsers: TypeUserInterface[] = [];
  typeUsersData = {} as TypeUserInterface;

  constructor
    (
      public helperService: HelperService,
      public userService: UserService,
      public foreignService: ForeignService
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
    this.readUser();
    this.foreignTypeUser();
  }

  readUser() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
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
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
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

  foreignTypeUser() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.foreignService.foreignTypeUsers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.typeUsers = JSON.parse(respuesta.data);
        } else {
          this.typeUsers = [];
        }
      },
      (error) => {
        console.log("error listar");
        console.log(error);
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  emailValid(email: string): boolean {
    let mailValido = false;
    'use strict';

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }


  createUser() {
    if (this.emailValid(this.usersData.correo)) {

      /*Funcion que se encarga de almacenar la informacion del rol*/
      let postDataObj = new FormData();
      postDataObj.append("idusuario", this.idusuario);
      postDataObj.append("cedula", this.usersData.cedula);
      postDataObj.append("nombre", this.usersData.nombre);
      postDataObj.append("apellido", this.usersData.apellido);
      postDataObj.append("correo", this.usersData.correo);
      postDataObj.append("tipoUsuario_idTipoUsuario", this.usersData.tipousuario);
      postDataObj.append("usuario", this.usersData.usuario);
      postDataObj.append("password", this.usersData.password);

      if (this.helperService.isValidValue(this.idusuario)) {
        postDataObj.append("type", "update");
      } else {
        postDataObj.append("type", "save");
      }

      this.userService.createUsers(postDataObj).subscribe(
        (data) => {
          let respuesta: any;
          respuesta = data;

          if (respuesta.res === "Success") {
            this.helperService.openModal(true, "Success", "Guardado exitosamente");
            this.readUser();
            // this.cleanUser();
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
    } else {
      // ingresar un correo  valido
    }
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

  cleanUser() {
    this.idusuario = null;
    this.usersData = {} as UserInterface;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
