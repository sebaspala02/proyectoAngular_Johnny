import { Component, OnInit } from "@angular/core";

import { NgForm } from "@angular/forms";
import { HelperService } from "src/app/util/HelperService";
import { SupplierInterface } from "src/app/models/supplier";
import { SupplierService } from "src/app/services/supplier.service";
import { error } from "@angular/compiler/src/util";
@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.css"],
})
export class SupplierComponent implements OnInit {
  proveedores: SupplierInterface[] = [];
  proveedorData = {} as SupplierInterface;
  idproveedor = "";

  constructor(
    public helperService: HelperService,
    public supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.listSuppliers();
  }
  listSuppliers() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.supplierService.listSuppliers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.proveedores = JSON.parse(respuesta.data);
        } else {
          this.proveedores = [];
        }
      },
      (error) => {
        console.log(error);
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }

  saveSupplier() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idproveedor", this.idproveedor + "");
    postDataObj.append("nit", this.proveedorData.nit + "");
    postDataObj.append("nombre", this.proveedorData.nombre);
    postDataObj.append("ciudad", this.proveedorData.ciudad);
    postDataObj.append("direccion", this.proveedorData.direccion);
    postDataObj.append("telefono", this.proveedorData.telefono);
    if (this.helperService.isValidValue(this.proveedorData.idproveedor)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.supplierService.saveSuppliers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listSuppliers();
          this.cleanSupplier();
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

  findSupplier(idproveedor) {
    let postDataObj = new FormData();

    postDataObj.append("idproveedor", idproveedor + "");
    postDataObj.append("type", "search");

    this.supplierService.findSuppliers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.proveedorData = JSON.parse(respuesta.data)[0];
          this.proveedorData.idproveedor = idproveedor;
          this.idproveedor = idproveedor;
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

  deleteSupplier() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idproveedor", this.idproveedor + "");
    postDataObj.append("type", "delete");

    this.supplierService.deleteSuplliers(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listSuppliers();
          this.cleanSupplier();
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
  cleanSupplier() {
    this.idproveedor = null;
    this.proveedorData = {} as SupplierInterface;
  }
}
