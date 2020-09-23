import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HelperService } from 'src/app/util/HelperService';
import { DrugInterface } from '../../models/drug';
import { DrugService } from '../../services/drug.service';
import { UserInterface } from '../../models/user';
import { ForeignService } from '../../services/foreign.service';
import { LabInterface } from '../../models/laboratory';
import { SupplierInterface } from '../../models/supplier';
import { ShelfInterface } from '../../models/shelf';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  drugs: DrugInterface[] = [];
  drugsData = {} as DrugInterface;
  idmedicamento = null;

  users: UserInterface[] = [];
  usersData = {} as UserInterface;
  idusuario = null;

  labs: LabInterface[] = [];
  labsData = {} as LabInterface;
  idlaboratorio = null;

  suppliers: SupplierInterface[] = [];
  suppliersData = {} as SupplierInterface;
  id = null;

  shelfs: ShelfInterface[] = [];
  shelfsData = {} as ShelfInterface;
  idestante = null;

  constructor
    (
      public helperService: HelperService,
      public drugService: DrugService,
      public foreignService: ForeignService
    ) { }

  ngOnInit(): void {
    this.readDrug();
    this.foreignUsers();
  }

  createDrug() {

    console.log("SIIIII entre create");

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idmedicamento", this.idmedicamento);
    postDataObj.append("nombre", this.drugsData.nombre);
    postDataObj.append("descrip", this.drugsData.descrip);
    postDataObj.append("fecha_venc", this.drugsData.fecha_venc);
    postDataObj.append("cant", this.drugsData.cant);
    postDataObj.append("fecha_creado", this.drugsData.fecha_creado);
    postDataObj.append("precio", this.drugsData.precio);
    postDataObj.append("usuario_idusuario", this.drugsData.usuario_idusuario);
    postDataObj.append("laboratorio_idlaboratorio", this.drugsData.laboratorio_idlaboratorio);
    postDataObj.append("proveedor_id", this.drugsData.proveedor_id);
    postDataObj.append("estante_idestante", this.drugsData.estante_idestante);

    if (this.helperService.isValidValue(this.idmedicamento)) {
      postDataObj.append("type", "update");
      console.log(postDataObj.get("type"));
    } else {
      postDataObj.append("type", "save");
      console.log(postDataObj.get("type"));
    }

    // console.log("el postDataObj");
    // console.log("postDataObj.get(malos)");
    // console.log(postDataObj.get("usuario_idusuario"));
    // console.log(postDataObj.get("laboratorio_idlaboratorio"));
    // console.log(postDataObj.get("proveedor_id"));
    // console.log("postDataObj.get(bueno)");
    // console.log(postDataObj.get("estante_idestante"));

    console.log("this.drugsData.usuario_idusuario");
    console.log(this.drugsData.usuario_idusuario);

    this.drugService.createDrugs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        console.log("data CREATE");
        console.log(data);

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Guardado exitosamente");
          this.readDrug();
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

  deleteDrug() {

    // console.log("delete idusuario");
    // console.log(idusuario);

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idmedicamento", this.idmedicamento);
    postDataObj.append("type", "delete");

    this.drugService.deleteDrugs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Success", "Eliminado exitosamente");
          this.readDrug();
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

  foreignUsers() {
    // ------------------> LISTAR COMBO_BOX USERS
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.foreignService.foreignUsers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.users = JSON.parse(respuesta.data);
          // this.usersData.usuario = JSON.parse(respuesta.data);
        } else {
          this.users = [];
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

    // ------------------> LISTAR COMBO_BOX LABS
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.foreignService.foreignLabs().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.labs = JSON.parse(respuesta.data);
        } else {
          this.labs = [];
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

    // ------------------> LISTAR COMBO_BOX SUPPLIERS
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.foreignService.foreignSuppliers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.suppliers = JSON.parse(respuesta.data);
        } else {
          this.suppliers = [];
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

    // ------------------> LISTAR COMBO_BOX SHELFS
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.foreignService.foreignShelfs().subscribe(
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

  readDrug() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.drugService.readDrugs().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.drugs = JSON.parse(respuesta.data);
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {
          this.drugs = [];
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

  searchDrug(idmedicamento) {

    let postDataObj = new FormData();

    postDataObj.append("idmedicamento", idmedicamento);
    postDataObj.append("type", "search");

    // setea el id del usuario buscado
    // this.IDusuario = idusuario;
    this.idmedicamento = idmedicamento;

    this.drugService.searchDrugs(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        console.log("BUSQUEDA la data bitch");
        console.log(data);

        if (respuesta.msj === "Success") {

          // console.log("idsuaurio gino");
          // console.log(idusuario);

          this.helperService.openModal(true, "Success", "Encontrado exitosamente");
          this.drugsData = JSON.parse(respuesta.data)[0];

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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  cleanDrug() {
    this.idmedicamento = null;
    this.drugsData = {} as DrugInterface;
  }

}
