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
import { error } from '@angular/compiler/src/util';
import { LabInterface } from '../../models/laboratory';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  labs: LabInterface[] = [];
  labsData = {} as LabInterface;
  idlaboratorio = null;

  constructor
    (
      public helperService: HelperService,
      public labService: LaboratoryService
    ) { }

  ngOnInit(): void {
    this.readLab();
  }

  readLab() {
 this.dtOptions = {
      pagingType: 'full_numbers',
    };
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.labService.readLabs().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.labs = JSON.parse(respuesta.data);
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {
          this.labs = [];
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  createLab() {

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idlaboratorio", this.idlaboratorio);
    postDataObj.append("nombre", this.labsData.nombre);
    postDataObj.append("descrip", this.labsData.descrip);

    if (this.helperService.isValidValue(this.idlaboratorio)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.labService.createLabs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Guardado exitosamente");
          this.readLab();
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
  }

  searchLab(idlaboratorio) {


    let postDataObj = new FormData();

    postDataObj.append("idlaboratorio", idlaboratorio);
    postDataObj.append("type", "search");

    // setea el id del usuario buscado
    // this.IDusuario = idusuario;
    this.idlaboratorio = idlaboratorio;

    this.labService.searchLabs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("la data bitch");
        // console.log(data);

        if (respuesta.msj === "Success") {

          // console.log("idsuaurio gino");
          // console.log(idusuario);

          this.helperService.openModal(true, "Success", "Encontrado exitosamente");
          this.labsData = JSON.parse(respuesta.data)[0];

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




  deleteLab() {

    // console.log("delete idusuario");
    // console.log(idusuario);

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idlaboratorio", this.idlaboratorio);
    postDataObj.append("type", "delete");

    this.labService.deleteLabs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Eliminado exitosamente");
          this.readLab();
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

  cleanLab() {
    this.idlaboratorio = null;
    this.labsData = {} as LabInterface;
  }

}
