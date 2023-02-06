//agregarButton.addEventListener("click", guardarPaciente);
class Paciente {
  constructor(
    id,
    nombre,
    apellidop,
    apellidom,
    edad,
    fechaUltimaVisita,
    procedimiento
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidop = apellidop;
    this.apellidom = apellidom;
    this.edad = edad;
    this.fechaUltimaVisita = fechaUltimaVisita;
    this.procedimiento = procedimiento;
  }
}

let pacientes = [];
let permiso;

//Validacion de fecha: (La fecha ingresada no debe ser posterior a hoy)
function validacionFecha() {
  let inputFecha = document.getElementById("input-fecha-ultima-visita");
  let fechaActual = new Date();
  let fechaUltimaVisita = new Date(inputFecha.value);

  if (fechaUltimaVisita <= fechaActual) {
    permiso = 1;
  } else {
    alert("La fecha de la ultima visita NO puede ser posterior a hoy");
    fechaUltimaVisita = document.getElementById(
      "input-fecha-ultima-visita"
    ).value = "";
    permiso = 0;
  }
}

//AGREGAR PACIENTE
function agregarPaciente() {
  let id = document.getElementById("input-id").value;
  let nombre = document.getElementById("input-nombre").value;
  let apellidop = document.getElementById("input-apellidop").value;
  let apellidom = document.getElementById("input-apellidom").value;
  let edad = document.getElementById("input-edad").value;
  let procedimiento = document.getElementById("input-procedimiento").value;
  let fechaUltimaVisita = document.getElementById(
    "input-fecha-ultima-visita"
  ).value;

  //Validacion de ID: (El ID del nuevo paciente no tiene que estar ya registrado)
  let pacienteExiste = false;
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].id === id) {
      pacienteExiste = true;
      break;
    }
  }

  //Validacion de ID: (Se debe introducir un ID obligatoriamente)
  if (id != "") {
    //Validacion de nombre: (Se debe introducir un nombre obligatoriamente)
    if (nombre != "") {
      //Validacion de apellido paterno: (Se debe introducir un apellido paterno obligatoriamente)
      if (apellidop != "") {
        //Validacion de edad: (Se debe introducir una edad obligatoriamente)
        if (edad != "") {
          //Validacion de procedimiento: (Se debe introducir el procedimiento obligatoriamente)
          if (procedimiento != "") {
            //Validacion de fecha: (Debe ingresar una fecha obligatoriamente)
            if (fechaUltimaVisita != "") {
              if (permiso === 1) {
                if (!pacienteExiste) {
                  let paciente = new Paciente(
                    id,
                    nombre,
                    apellidop,
                    apellidom,
                    edad,
                    fechaUltimaVisita,
                    procedimiento
                  );
                  pacientes.push(paciente);
                  console.log("Paciente dado de alta");

                  id = document.getElementById("input-id").value = "";
                  nombre = document.getElementById("input-nombre").value = "";
                  apellidop = document.getElementById("input-apellidop").value =
                    "";
                  apellidom = document.getElementById("input-apellidom").value =
                    "";
                  edad = document.getElementById("input-edad").value = "";
                  fechaUltimaVisita = document.getElementById(
                    "input-fecha-ultima-visita"
                  ).value = "";
                  procedimiento = document.getElementById(
                    "input-procedimiento"
                  ).value = "";
                  mostrarPacientes();
                } else {
                  alert(
                    "El ID que intenta registrar ya existe, ingrese otro ID"
                  );
                }
              }
            } else {
              alert("Ingrese la fecha de la ultima visita");
            }
          } else {
            alert("Se debe introducir el procedimiento obligatoriamente");
          }
        } else {
          alert("No se ha introducido la edad del paciente");
        }
      } else {
        alert("No se ha introducido un apellido paterno");
      }
    } else {
      alert("No se ha introducido un nombre");
    }
  } else {
    alert("No se ha introducido un ID");
  }
}

//MOSTRAR PACIENTES
function mostrarPacientes() {
  // Obtiene el elemento HTML donde se mostrará la tabla
  let tabla = document.getElementById("tabla-pacientes");
  let filas = tabla.getElementsByTagName("tr");

  while (filas.length > 1) {
    tabla.deleteRow(1);
  }

  // while (tabla.firstChild) {
  //   tabla.removeChild(tabla.firstChild);
  // }
  // Crea una fila para cada paciente en el array
  for (let paciente of pacientes) {
    let fila = document.createElement("tr");

    let celdaId = document.createElement("td");
    celdaId.textContent = paciente.id;

    let celdaApellidoP = document.createElement("td");
    celdaApellidoP.textContent = paciente.apellidop;

    let celdaApellidoM = document.createElement("td");
    celdaApellidoM.textContent = paciente.apellidom;

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = paciente.nombre;

    let celdaEdad = document.createElement("td");
    celdaEdad.textContent = paciente.edad;

    let celdaFechaUltimaVisita = document.createElement("td");
    celdaFechaUltimaVisita.textContent = paciente.fechaUltimaVisita;

    let celdaProcedimiento = document.createElement("td");
    celdaProcedimiento.textContent = paciente.procedimiento;

    fila.appendChild(celdaId);
    fila.appendChild(celdaApellidoP);
    fila.appendChild(celdaApellidoM);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaEdad);
    fila.appendChild(celdaFechaUltimaVisita);
    fila.appendChild(celdaProcedimiento);

    tabla.appendChild(fila);
  }
}

//CONSULTAR PACIENTE POR APELLIDO
function mostrarPacientesPorApellido() {
  let inputApellido = document.getElementById("input-get-apellido").value;

  let pacientesFiltrados = pacientes.filter(function (paciente) {
    return paciente.apellidop.toLowerCase() === inputApellido.toLowerCase();
  });

  let tabla = document.getElementById("tabla-pacientes-apellido");
  let filas = tabla.getElementsByTagName("tr");

  while (filas.length > 1) {
    tabla.deleteRow(1);
  }

  // Limpiamos la tabla
  tabla.innerHTML = "";

  // Agregamos la cabecera de la tabla
  let cabecera = document.createElement("tr");
  cabecera.innerHTML =
    "<th>ID</th><th>Apellido paterno</th><th>Apellido materno</th><th>Nombre</th><th>Edad</th><th>Fecha última visita</th><th>Procedimiento</th>";
  tabla.appendChild(cabecera);

  // Agregamos las filas de la tabla
  pacientesFiltrados.forEach(function (paciente) {
    let fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" +
      paciente.id +
      "</td>" +
      "<td>" +
      paciente.apellidop +
      "</td>" +
      "<td>" +
      paciente.apellidom +
      "</td>" +
      "<td>" +
      paciente.nombre +
      "</td>" +
      "<td>" +
      paciente.edad +
      "</td>" +
      "<td>" +
      paciente.fechaUltimaVisita +
      "</td>" +
      "<td>" +
      paciente.procedimiento +
      "</td>";
    tabla.appendChild(fila);
  });

  // Limpiamos el input
  inputApellido = document.getElementById("input-get-apellido").value = "";
}

//MOSTRAR PACIENTES POR PROCEDIMIENTO
function mostrarPacientesPorProcedimiento() {
  let procedimiento = document.getElementById(
    "input-procedimiento-search"
  ).value;

  let pacientesFiltrados = pacientes.filter(function (paciente) {
    return (
      paciente.procedimiento
        .toLowerCase()
        .indexOf(procedimiento.toLowerCase()) !== -1
    );
  });

  let tabla = document.getElementById("tabla-pacientes-procedimiento");
  let filas = tabla.getElementsByTagName("tr");

  while (filas.length > 1) {
    tabla.deleteRow(1);
  }

  // Limpiamos la tabla
  tabla.innerHTML = "";

  // Agregamos la cabecera de la tabla
  let cabecera = document.createElement("tr");
  cabecera.innerHTML =
    "<th>ID</th><th>Apellido paterno</th><th>Apellido materno</th><th>Nombre</th><th>Edad</th><th>Fecha última visita</th><th>Procedimiento</th>";
  tabla.appendChild(cabecera);

  // Agregamos las filas de la tabla
  if (procedimiento != "") {
    pacientesFiltrados.forEach(function (paciente) {
      let fila = document.createElement("tr");
      fila.innerHTML =
        "<td>" +
        paciente.id +
        "</td>" +
        "<td>" +
        paciente.apellidop +
        "</td>" +
        "<td>" +
        paciente.apellidom +
        "</td>" +
        "<td>" +
        paciente.nombre +
        "</td>" +
        "<td>" +
        paciente.edad +
        "</td>" +
        "<td>" +
        paciente.fechaUltimaVisita +
        "</td>" +
        "<td>" +
        paciente.procedimiento +
        "</td>";
      tabla.appendChild(fila);
    });

    procedimiento = document.getElementById(
      "input-procedimiento-search"
    ).value = "";
  }

  //alert("Ningun procedimiento coincide con lo introducido");
}

//ELIMINAR PACIENTE
function eliminarPaciente() {
  let idEliminar = document.getElementById("input-id-eliminar").value;

  pacientes = pacientes.filter(function (paciente) {
    return paciente.id !== idEliminar;
  });
  console.log("Paciente eliminado");

  idEliminar = document.getElementById("input-id-eliminar").value = "";
  mostrarPacientes();
  mostrarPacientesPorApellido();
  mostrarPacientesPorProcedimiento();
}
