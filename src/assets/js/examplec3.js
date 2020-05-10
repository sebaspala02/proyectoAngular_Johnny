/* global c3 */

//http://c3js.org/gettingstarted.html
//http://c3js.org/examples.html
function grafico() {
  cargarDataset7();
}
var param = location.search.substring(1, location.search.length);
var arrayParam = param.split("&");
var tipo = arrayParam[1];
console.log(tipo);

if (tipo == 1) {
  cargarDataset1();
} else if (tipo == 2) {
  cargarDataset2();
} else if (tipo == 3) {
  cargarDataset3();
} else if (tipo == 4) {
  cargarDataset4();
} else if (tipo == 5) {
  cargarDataset5();
} else if (tipo == 6) {
  cargarDataset6();
}

function cargarDataset7() {
  var chart = c3.generate({
    bindto: "#chart7",
    data: {
      columns: [
        ["data1", 30, 200, 100, 400, 150, 250],
        ["data2", 50, 20, 10, 40, 15, 25],
      ],
    },
  });

  setTimeout(function () {
    chart.load({
      columns: [["data1", 230, 190, 300, 500, 300, 400]],
    });
  }, 1000);

  setTimeout(function () {
    chart.load({
      columns: [["data3", 130, 150, 200, 300, 200, 100]],
    });
  }, 1500);

  setTimeout(function () {
    chart.unload({
      ids: "data1",
    });
  }, 2000);
}

function cargarDataset1() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/

  //   document.getElementById("chart3").style.display = "block";
  document.getElementById("titulo").innerHTML = "Grafica #1";
  document.getElementById("tipo").innerHTML = "Consulta Genero";
  var info = {};
  var arreglo = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(res);

      //   var info = JSON.parse(data);

      console.log(info);

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          var fila = [info[k].genero, info[k].total];
          arreglo.push(fila);
          console.log(fila[0] + " ");
          console.log(fila[1] + " ");

          var chart3 = c3.generate({
            bindto: "#chart1",
            data: {
              columns: [
                ["".concat(arreglo[1]), info[1].total],
                ["".concat(arreglo[0]), info[0].total],
              ],
              // url: "resource/data/datos1.csv",
              type: "donut",
              onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
                console.log(d.id);
                console.log(d.value);
              },
            },
            donut: {
              title: "Cant. Clientes por Genero",
            },
          });
          //   fin
        }
      }

      console.log(arreglo[0] + "W !");
      console.log(arreglo[1] + "M !");
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}

function cargarDataset2() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/
  //   document.getElementById("chart2").style.display = "block";
  //   $("#chart2").hide();
  document.getElementById("titulo").innerHTML = "Grafica #2";
  document.getElementById("tipo").innerHTML = "Consulta Prodcutos";
  var info = {};
  var name = [];
  var cant = [];
  let fila = [];
  //   var arreglo = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list1" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(res);

      //   var info = JSON.parse(data);

      console.log(info);

      //   if (info.length > 0) {
      //     for (k = 0; k < info.length; k++) {
      //       var fila = [info[k].nombre, info[k].cantidad];
      //       arreglo.push(fila);
      //       console.log(k);
      //     }
      //   }

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          name.push(info[k].nombre);

          cant.push(info[k].cantidad);

          console.log(name);

          console.log(cant);

          fila.push([name[k] + "," + cant[k], cant[k]]);

          console.log("fila");
          console.log(fila);

          //   $("#chart3").hide();
          var chart2 = c3.generate({
            bindto: "#chart2",
            data: {
              columns: fila,
              // url: "resource/data/datos1.csv",
              type: "donut",
            },
            donut: {
              title: "Cant. de Productos",
            },
          });
        }
        // return fila;
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}

function cargarDataset3() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/
  //   document.getElementById("chart2").style.display = "block";
  //   $("#chart2").hide();
  document.getElementById("titulo").innerHTML = "Grafica #3";
  document.getElementById("tipo").innerHTML = "Consulta Venta de Prodcutos";
  var info = {};
  var arreglo = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list2" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(res);

      console.log(info);

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          var fila = [info[k].nombre, info[k].cantidad, info[k].ganancia];
          arreglo.push(fila);
          console.log(k);
        }
        var chart2 = c3.generate({
          bindto: "#chart3",
          data: {
            columns: arreglo,
            // url: "resource/data/datos1.csv",
            type: "area-spline",
          },
          spline: {
            title: "Cant. Venta de Productos",
          },
        });
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}

function cargarDataset4() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/
  //   document.getElementById("chart2").style.display = "block";
  //   $("#chart2").hide();
  document.getElementById("titulo").innerHTML = "Grafica #4";
  document.getElementById("tipo").innerHTML = "Consulta Venta por Empleado";
  let info = {};
  var fila = [];
  var name = [];
  var venta = [];
  var user = [];
  var sold = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list3" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(respuesta);

      console.log(info);

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          name.push(info[k].nombre);
          user.push(info[k].usuario);
          venta.push(info[k].ventas);
          sold.push(info[k].ingresos);

          fila.push([
            "El empleado " + name[k] + ", Usuario:" + user[k],
            venta[k],
            sold[k],
          ]);

          var chart2 = c3.generate({
            bindto: "#chart4",
            data: {
              columns: fila,
              // url: "resource/data/datos1.csv",
              type: "bar",
            },
            bar: {
              title: "Cant. Venta por Empleado",
            },
          });
        }
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}

function cargarDataset5() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/
  //   document.getElementById("chart2").style.display = "block";
  //   $("#chart2").hide();
  document.getElementById("titulo").innerHTML = "Grafica #5";
  document.getElementById("tipo").innerHTML = "Ventas por Día";
  let info = {};
  var fila = [];
  var venta = [];
  var cant = [];
  var ingresos = [];
  // var sold = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list4" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(respuesta);

      console.log(info);

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          venta.push(info[k].fecha_venta);
          cant.push(info[k].cantidad);
          ingresos.push(info[k].ingresos);

          fila.push(["Venta en la fecha: " + venta[k], cant[k], ingresos[k]]);

          // + "por la cantidad de: " + cant[k]

          var chart2 = c3.generate({
            bindto: "#chart5",
            data: {
              columns: fila,
              // url: "resource/data/datos1.csv",
              type: "bar",
            },
            bar: {
              width: {
                ratio: 0.5,
              },
            },
          });
        }
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}

function cargarDataset6() {
  /*La grafica 3 sera de tipo lineas, y se cargara con un conjunto de datos
   * externo en formato csv*/
  //   document.getElementById("chart2").style.display = "block";
  //   $("#chart2").hide();
  document.getElementById("titulo").innerHTML = "Grafica #6";
  document.getElementById("tipo").innerHTML = "Ventas por Día";
  let info = {};
  var fila = [];
  var dia = [];
  var cant = [];
  var ingresos = [];
  // var sold = [];
  $.ajax({
    type: "post",
    url: "controller/ctlGraficos.php",
    beforeSend: function () {},
    data: { type: "list5" },
    success: function (respuesta) {
      const res = JSON.parse(respuesta);
      info = JSON.parse(res.data);

      console.log(respuesta);

      console.log(info);

      if (info.length > 0) {
        for (k = 0; k < info.length; k++) {
          dia.push(info[k].dia);
          cant.push(info[k].ventas);
          ingresos.push(info[k].ingresos);

          fila.push(["Día: " + dia[k], cant[k], ingresos[k]]);

          // + "por la cantidad de: " + cant[k]

          var chart2 = c3.generate({
            bindto: "#chart6",
            data: {
              columns: fila,
              // url: "resource/data/datos1.csv",
              type: "bar",
            },
            bar: {
              title: "Cant. Venta por Día del Mes",
            },
            types: {
              fila: "area",
              fila: "area-spline",
            },
          });
        }
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      Swal.fire(
        "Error detectado: " + textStatus + "\nException: " + errorThrown
      );
      Swal.fire("verifique la ruta de archivo!");
    },
  });
}
