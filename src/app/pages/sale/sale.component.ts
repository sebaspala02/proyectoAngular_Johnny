import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SaleInterface } from "src/app/models/sale";
import { HelperService } from "src/app/util/HelperService";
import { SaleService } from "src/app/services/sale.service";
import { ProductInterface } from "src/app/models/product";
import { CartProductInterface } from "src/app/models/cartProduct";
import { CustomerNameInterface } from "src/app/models/customerName";
import { UserInterface } from "src/app/models/user";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html",
  styleUrls: ["./sale.component.css"],
})
export class SaleComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  users: SaleInterface[] = [];
  products = [];
  cartProducts: CartProductInterface[] = [];
  customers: UserInterface[] = [];
  selectedCustomer = {} as UserInterface;
  salesData = {} as SaleInterface;
  idusuario = 2;
  idCliente = null;
  idventa = null;
  price = 0;
  points = 0;
  payment = 0;
  password = "";
  passmodalOpen = false;
  constructor(
    public helperService: HelperService,
    public saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.listProducts();
    this.listCustomers();
  }
  listProducts() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.saleService.listProducts().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.products = JSON.parse(respuesta.data);
          this.products = this.products.filter(
            (medi) => parseFloat(medi.cantidad) > 0
          );
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {
          // console.log(dataxzzz)
          this.products = [];
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
  listCustomers() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.saleService.listCustomers().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(data);
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.customers = JSON.parse(respuesta.data);
        } else {
          // console.log(dataxzzz)
          this.customers = [];
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
  addToCart(product) {
    let p: CartProductInterface = {
      idmedicamento: product.idmedicamento,
      nombre: product.nombre,
      cantidad: "1",
      inventario: product.cantidad,
      precio: product.precio,
    };
    let found = this.cartProducts.find(
      (prod) => prod.idmedicamento == product.idmedicamento
    );

    if (found) {
      if (parseFloat(found.cantidad) + 1 <= product.cantidad)
        found.cantidad = (parseFloat(found.cantidad) + 1).toString();
    } else {
      this.cartProducts.push(p);
    }
    this.calculatePrice();
  }
  removeFromCart(product: CartProductInterface) {
    let index = this.cartProducts.indexOf(product, 0);
    this.cartProducts.splice(index, 1);
    this.calculatePrice()
  }
  calculatePrice() {
    this.price = 0;
    this.cartProducts.forEach((element) => {
      this.price += parseFloat(element.cantidad) * parseFloat(element.precio);
    });
  }
  saveSale() {
    this.points = 0;
    if (this.payment == 0) {
      if (this.price > 10000)
        this.points = parseFloat(this.price.toString().charAt(0)) * 100;
      this.pay();
    } else if (this.payment == 1) {
      this.passmodalOpen = true;
    }
  }
  pay() {
    console.log(this.idCliente)
    this.passmodalOpen = false;
    if (
      this.cartProducts.length > 0 &&
      this.idCliente > 0
    ) {
      let ids = this.cartProducts.map((obj) => parseFloat(obj.idmedicamento));
      let cants = this.cartProducts.map((obj) => parseFloat(obj.cantidad));
      /*Funcion que se encarga de almacenar la informacion del rol*/
      let postDataObj = new FormData();
      postDataObj.append("iddetalle_venta", null);
      postDataObj.append("total", this.price.toString());
      postDataObj.append("fecha", new Date().toString());
      postDataObj.append("medi", ids.toString() + ",");
      postDataObj.append("cant", cants.toString() + ",");
      postDataObj.append("cliente", this.idCliente.toString());
      postDataObj.append("usuario", this.idusuario.toString());
      postDataObj.append("idventa", null);
      postDataObj.append("puntos", this.points.toString());
      // if (this.helperService.isValidValue(this.idventa)) {
      // postDataObj.append("type", "update");
      // } else {
      postDataObj.append("type", "save");
      // }
      this.saleService.createSale(postDataObj).subscribe(
        (data) => {
          let respuesta: any;
          respuesta = data;
          this.clean();
          if (respuesta.res === "Success") {
            this.helperService.openModal(
              true,
              "Success",
              "Guardado exitosamente"
            );
            // this.readLab();
            // this.cleanUser();
            // location.reload();
          } else {
            this.helperService.openModal(
              true,
              "Alerta",
              "No se detecto ningun cambio en la base de datos"
            );
          }
        },
        (error) => {
          this.helperService.openModal(
            true,
            "Alerta",
            "Error consumiendo el servicio"
          );
        }
      );
    } else {
      this.helperService.openModal(true, "Alerta", "error");
      this.clean();
    }
  }
  pay2() {
    console.log(this.idCliente)
    let client = this.customers.find((e) => e.idusuario == this.idCliente);
    this.passmodalOpen = false;
    if (
      this.cartProducts.length > 0 &&
      this.idCliente > 0 &&
      this.password == client.cedula
    ) {
      let ids = this.cartProducts.map((obj) => parseFloat(obj.idmedicamento));
      let cants = this.cartProducts.map((obj) => parseFloat(obj.cantidad));
      /*Funcion que se encarga de almacenar la informacion del rol*/
      let postDataObj = new FormData();
      postDataObj.append("iddetalle_venta", null);
      postDataObj.append("total", this.price.toString());
      postDataObj.append("fecha", new Date().toString());
      postDataObj.append("medi", ids.toString() + ",");
      postDataObj.append("cant", cants.toString() + ",");
      postDataObj.append("cliente", this.idCliente.toString());
      postDataObj.append("usuario", this.idusuario.toString());
      postDataObj.append("idventa", null);
      postDataObj.append("puntos", this.points.toString());
      // if (this.helperService.isValidValue(this.idventa)) {
      // postDataObj.append("type", "update");
      // } else {
      postDataObj.append("type", "save");
      // }
      this.saleService.createSale(postDataObj).subscribe(
        (data) => {
          let respuesta: any;
          respuesta = data;
          this.clean();
          if (respuesta.res === "Success") {
            this.helperService.openModal(
              true,
              "Success",
              "Guardado exitosamente"
            );
            // this.readLab();
            // this.cleanUser();
            // location.reload();
          } else {
            this.helperService.openModal(
              true,
              "Alerta",
              "No se detecto ningun cambio en la base de datos"
            );
          }
        },
        (error) => {
          this.helperService.openModal(
            true,
            "Alerta",
            "Error consumiendo el servicio"
          );
        }
      );
    } else {
      this.helperService.openModal(true, "Alerta", "Codigo Incorrecto");
      this.clean();
    }
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  clean() {
    this.listProducts();
    this.cartProducts = [];
    this.payment = 0;
    this.price = 0;
    this.points = 0;
  }
}
