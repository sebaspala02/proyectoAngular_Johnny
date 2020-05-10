function hideClient() {
  $("#element").hide();
  return false;
}

function showClient() {
  $("#element").show();
  return false;
}

$(document).ready(function () {
  // $("#hide").click(hideClient);

  // $("#show").click(showClient);

  // function hideClient() {
  //   $("#element").hide();
  //   return false;
  // }

  // function showClient() {
  //   $("#element").show();
  //   return false;
  // }

  // $("#hide").on("click", function () {
  //   $("#element").hide();
  //   return false;
  // });

  // $("#show").on("click", function () {
  //   $("#element").show();
  //   return false;
  // });

  listarClientes();
  listarMedi();
  $("#btnGuardarC").click(guardarCliente);
  $("#btnModificarC").click(guardarCliente);
  $("#btnEliminarC").click(eliminarCliente);

  function guardarCliente() {
    let objCliente = {
      idcliente: $("#txtIdCliente").val(),
      nombre: $("#txtNombreCliente").val().toLowerCase(),
      apellido: $("#txtApellidoCliente").val().toLowerCase(),
      cedula: $("#txtCedulaCliente").val(),
      genero: $("#txtGenero").val(),
      type: "",
    };
    if (
      objCliente.nombre !== "" &&
      objCliente.apellido !== "" &&
      objCliente.cedula !== "" &&
      objCliente.genero !== "" &&
      objCliente.fecha_naci !== ""
    ) {
      if (objCliente.idcliente !== "") {
        objCliente.type = "update";
      } else {
        objCliente.type = "save";
      }
      $.ajax({
        type: "post",
        url: "controller/ctlCliente.php",
        beforeSend: function () {},
        data: objCliente,
        success: function (data) {
          console.log(data);
          var info = JSON.parse(data);
          console.log(info);
          if (info.res === "Success") {
            limpiar();
            alert("Operacion exitosa");
            listarClientes();
          } else {
            alert("No se pudo almacenar");
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          alert(
            "Error detectado: " + textStatus + "\nException: " + errorThrown
          );
          alert("verifique la ruta de archivo!");
        },
      });
    } else {
      alert("Ingrese todos los datos");
    }
  }

  function listarClientes() {
    $.ajax({
      type: "post",
      url: "controller/ctlCliente.php",
      beforeSend: function () {},
      data: {
        type: "list",
      },

      success: function (respuesta) {
        //console.log(data);
        const res = JSON.parse(respuesta);
        const info = JSON.parse(res.data);

        var lista = "";

        if (info.length > 0) {
          for (k = 0; k < info.length; k++) {
            lista =
              lista +
              '<tr id="codigo" onclick="buscarCliente(' +
              info[k].idcliente +
              ')">';
            lista =
              lista +
              '<td style="display: none">' +
              info[k].idcliente +
              "</td>";
            lista = lista + "<td>" + info[k].nombre + "</td>";
            lista = lista + "<td>" + info[k].apellido + "</td>";
            lista = lista + "<td>" + info[k].cedula + "</td>";
            lista = lista + "<td>" + info[k].genero + "</td>";
            lista = lista + "<td>" + info[k].fecha_naci + "</td>";
            // if (info[k].piscina === '1') {
            //     lista = lista + '<td>SI</td>';
            // } else {
            //     lista = lista + '<td>NO</td>';
            // }
            lista = lista + "</tr>";
          }
          $("#listaCliente").html(lista);
          $("#tableClientes").dataTable({
            language: {
              lengthMenu: "Mostrar _MENU_ elementos por pagina",
              zeroRecords: "No se encuentra la informacion",
              info: "Mostrando pagina _PAGE_ de _PAGES_",
              infoEmpty: "Informacion vacia",
              infoFiltered: "(filtered from _MAX_ total records)",
              search: "Buscar:",
              paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Siguiente",
                previous: "Anterior",
              },
            },
          });
        } else {
          $("#listaCliente").html(
            "<tr><td>No se encuentra informacion</td>></tr>"
          );
        }
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert("Error detectado: " + textStatus + "\nException: " + errorThrown);
        alert("verifique la ruta de archivo!");
      },
    });
  }

  function buscarCliente(codigo) {
    $("#txtIdCliente").val(codigo);
    const objCliente = {
      idcliente: $("#txtIdCliente").val(),
      type: "search",
    };

    $.ajax({
      type: "post",
      url: "controller/ctlCliente.php",
      async: false,
      beforeSend: function () {},
      data: objCliente,
      success: function (res) {
        // console.log(data);
        const info = JSON.parse(res);
        let data;
        if (info.res !== "NotInfo") {
          data = JSON.parse(info.data);
        }
        if (info.msj === "Success") {
          $("#txtNombreCliente").val(data[0].nombre);
          $("#txtApellidoCliente").val(data[0].apellido);
          $("#txtCedulaCliente").val(data[0].cedula);
          $("#txtGenero").val(data[0].genero);
          $("#txtCedulaClienteVenta").val(codigo);
        } else {
          alert("No se encuentra");
          limpiar();
        }
      },
    });
  }

  // function listMunicipios() {
  //     console.log($('#txtDepto').val())
  //     $.ajax({
  //         type: 'post',
  //         url: "controller/ctlList.php",
  //         data: { type: 'loadListMuni', depto: $('#txtDepto').val()},
  //         success: function (response) {
  //             var aux= JSON.parse(response)
  //             var municipios = JSON.parse(aux.data);
  //             console.log(municipios)
  //             var combo = "<option value='0'>---SELECCIONAR MUNICIPIO---</option>";
  //             if (municipios.length > 0) {
  //                 for (k = 0; k < municipios.length; k++) {
  //                     combo = combo + "<option value='" + municipios[k].idMunicipio + "'>" + municipios[k].nombreMpio + "</option>";
  //                 }
  //                 $("#txtMunicipio").html(combo);
  //             } else {

  //             }
  //         },
  //         error: (jqXHR, textStatus, errorThrown) => {
  //             alert("Error detectado: " + textStatus + "\nException: " + errorThrown);
  //             alert("verifique la ruta de archivo!");
  //         }
  //     });
  // }

  function eliminarCliente() {
    var dato = $("#txtIdCliente").val();
    if (dato == "") {
      alert("Debe cargar los datos a eliminar");
    } else {
      const objCliente = {
        idcliente: dato,
        type: "delete",
      };

      $.ajax({
        type: "post",
        url: "controller/ctlCliente.php",
        beforeSend: function () {},
        data: objCliente,
        success: function (res) {
          var info = JSON.parse(res);
          if (info.res == "Success") {
            limpiar();
            alert("Eliminado con exito");
            listarClientes();
          } else {
            alert("No se pudo eliminar");
            limpiar();
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          alert(
            "Error detectado: " + textStatus + "\nException: " + errorThrown
          );
          alert("verifique la ruta de archivo!");
        },
      });
    }
  }

  function limpiar() {
    $("#txtIdCliente").val("");
    $("#txtNombreCliente").val("");
    $("#txtApellidoCliente").val("");
    $("#txtCedulaCliente").val("");
    $("#txtGenero").val("");
    $("#txtFecha_naci").val("");
  }

  // function listDeptos() {
  //     $.ajax({
  //         type: 'post',
  //         url: "controller/ctlList.php",
  //         beforeSend: function() {

  //         },
  //         data: { type: 'loadListDepto' },
  //         success: function(respuesta) {
  //             const res = JSON.parse(respuesta);
  //             const info = JSON.parse(res.data);
  //             var lista = "<option value='0'>---SELECCIONE DEPTO---</option>";

  //             if (info.length > 0) {
  //                 for (k = 0; k < info.length; k++) {
  //                     lista = lista + "<option value='" + info[k].idDepartamento + "'>" + info[k].nombreDepto + "</option>";
  //                 }
  //                 $("#txtDepto").html(lista);
  //             } else {

  //             }
  //         },
  //         error: (jqXHR, textStatus, errorThrown) => {
  //             alert("Error detectado: " + textStatus + "\nException: " + errorThrown);
  //             alert("verifique la ruta de archivo!");
  //         }
  //     });
  // }   });
  // }
});
