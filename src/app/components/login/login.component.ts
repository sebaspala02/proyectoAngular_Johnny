import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { HelperService } from 'src/app/util/HelperService';
import { Router } from '@angular/router';
import { LoginInterface } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInData = {} as LoginInterface;

  constructor
    (
      private loginService: LoginService,
      private helperService: HelperService,
      private router: Router
    ) { }

  ngOnInit(): void {
  }

  logIn() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();

    postDataObj = this.helperService.mappingObjectToForm(this.logInData);
    postDataObj.append("type", "conNotRedirect");

    this.loginService.logIn(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        console.log("LA data LOGIN");
        console.log(data);

        if (respuesta.msj === "Success") {
          this.helperService.saveLocalData("user", true);
          this.helperService.saveLocalData("nombreusuario", (respuesta.data)[0].nombre);
          this.router.navigateByUrl("/home");
        } else {
          this.helperService.openModal(true, "Info", "EL usuario no existe");
        }
      },
      (error) => {
        console.log("error");
        console.log(error);
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }
}
