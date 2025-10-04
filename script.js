// arrays donde guardo todas las reservas
let reservas = [];
let indiceEditar = -1;

// agarro el formulario y la tabla
const form = document.getElementById('reservaForm');
const tabla = document.querySelector('#tablaReservas');

// cuando doy a registrar
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // capturo valores
    let nombre = document.getElementById('nombre').value.trim();
    let matricula = document.getElementById('matricula').value.trim();
    let contacto = document.getElementById('contacto').value.trim();
    let correo = document.getElementById('correo').value.trim();
    let actividad = document.getElementById('actividad').value;
    let fecha = document.getElementById('fecha').value;
    let horaInicio = document.getElementById('horaInicio').value;
    let duracion = document.getElementById('duracion').value;
    let documento = document.getElementById('documento').value;
    let numDoc = document.getElementById('numDoc').value.trim();

    // validaciones
    const regexMatricula = /^[A-Za-z0-9]{1,8}$/;
    if (!regexMatricula.test(matricula)) {
        alert("⚠️ Matrícula: máximo 8 caracteres alfanuméricos.");
        return;
    }

    const regexContacto = /^[0-9]{9}$/;
    if (!regexContacto.test(contacto)) {
        alert("⚠️ Contacto: exactamente 9 números.");
        return;
    }

    if (documento === "dni") {
        const regexDni = /^[0-9]{8}$/;
        if (!regexDni.test(numDoc)) {
            alert("⚠️ El DNI debe tener 8 dígitos.");
            return;
        }
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@uch\.pe$/;
    if (!regexCorreo.test(correo)) {
        alert("⚠️ El correo debe ser institucional (@uch.pe).");
        return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    if (fecha < hoy) {
        alert("⚠️ No puedes registrar fechas pasadas.");
        return;
    }

    if (horaInicio < "08:15" || horaInicio > "19:00") {
        alert("⚠️ La hora de inicio debe estar entre 08:15 y 19:00.");
        return;
    }

    if (duracion < 1 || duracion > 3) {
        alert("⚠️ La duración máxima es de 3 horas.");
        return;
    }

    // creo reserva
    const reserva = { nombre, matricula, contacto, correo, actividad, fecha, horaInicio, duracion, documento, numDoc };

    if (indiceEditar === -1) {
        reservas.push(reserva); // nueva
    } else {
        reservas[indiceEditar] = reserva; // edición
        indiceEditar = -1;
    }

    mostrarReservas();
    alert("✅ Tu reserva fue registrada con éxito.");
    form.reset();
});

// mostrar reservas
function mostrarReservas() {
    tabla.innerHTML = "";

    reservas.forEach((r, i) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${r.nombre}</td>
            <td>${r.matricula}</td>
            <td>${r.contacto}</td>
            <td>${r.correo}</td>
            <td>${r.actividad}</td>
            <td>${r.fecha}</td>
            <td>${r.horaInicio}</td>
            <td>${r.duracion} h</td>
            <td>${r.documento}</td>
            <td>${r.numDoc}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarReserva(${i})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${i})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// editar reserva
function editarReserva(index) {
    const r = reservas[index];
    document.getElementById('nombre').value = r.nombre;
    document.getElementById('matricula').value = r.matricula;
    document.getElementById('contacto').value = r.contacto;
    document.getElementById('correo').value = r.correo;
    document.getElementById('actividad').value = r.actividad;
    document.getElementById('fecha').value = r.fecha;
    document.getElementById('horaInicio').value = r.horaInicio;
    document.getElementById('duracion').value = r.duracion;
    document.getElementById('documento').value = r.documento;
    document.getElementById('numDoc').value = r.numDoc;

    indiceEditar = index;
}

// eliminar reserva
function eliminarReserva(index) {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
        reservas.splice(index, 1);
        mostrarReservas();
    }
}
