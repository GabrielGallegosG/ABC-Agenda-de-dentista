//const agregarButton = document.getElementById("input-agregar-button".value);

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
  const fechaActual = new Date();

  //Validacion de fecha: (Debe ingresar una fecha obligatoriamente)
  if (fechaUltimaVisita != "") {
    if (fechaUltimaVisita <= fechaActual) {
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
    } else {
      alert("La fecha de la ultima visita NO puede ser posterior a hoy");
    }
  } else {
    alert("Ingrese la fecha de la ultima visita");
  }

  id = document.getElementById("input-id").value = "";
  nombre = document.getElementById("input-nombre").value = "";
  apellidop = document.getElementById("input-apellidop").value = "";
  apellidom = document.getElementById("input-apellidom").value = "";
  edad = document.getElementById("input-edad").value = "";
  fechaUltimaVisita = document.getElementById(
    "input-fecha-ultima-visita"
  ).value = "";
  procedimiento = document.getElementById("input-procedimiento").value = "";
  mostrarPacientes();
}

//MOSTRAR PACIENTES
function mostrarPacientes() {
  // Obtiene el elemento HTML donde se mostrará la tabla
  let tabla = document.getElementById("tabla-pacientes");

  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
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

//CONSULTAR PACIENTE POR NOMBRE
function mostrarPacientesPorId() {
  let nombre = document.getElementById("input-get-nombre").value;

  let pacientesFiltrados = pacientes.filter(function (paciente) {
    return paciente.apellidop === nombre;
  });

  let tabla = document.getElementById("tabla-pacientes-nombre");

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
}

//MOSTRAR PACIENTES POR PROCEDIMIENTO
function mostrarPacientesPorProcedimiento() {
  let procedimiento = document.getElementById(
    "input-procedimiento-search"
  ).value;

  let pacientesFiltrados = pacientes.filter(function (paciente) {
    return paciente.procedimiento === procedimiento;
  });

  let tabla = document.getElementById("tabla-pacientes-procedimiento");

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
}
