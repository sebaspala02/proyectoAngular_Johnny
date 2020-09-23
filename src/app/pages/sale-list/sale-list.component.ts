import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleService } from '../../services/sale.service';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HelperService } from 'src/app/util/HelperService';
import { SaleInterface } from 'src/app/models/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  sales: SaleInterface[] = [];

  constructor(
    public helperService: HelperService,
    public salesService: SaleService
  ) { }

  ngOnInit(): void {
    this.readSales();
  }

  readSales() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.salesService.listSales().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        // console.log("data listar");
        // console.log(data);

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.sales = JSON.parse(respuesta.data);
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {
          this.sales = [];
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
