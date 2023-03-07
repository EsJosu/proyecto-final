const urlFacturas = 'http://localhost:3000/factura';
const urlDetalles = 'http://localhost:3000/det';

// Obtener datos de facturas
axios.get(urlFacturas)
  .then(function(response) {
    const facturas = response.data;

    // Agregar filas a tabla facturas
    const tablaFacturas = document.getElementById('tabla-facturas').getElementsByTagName('tbody')[0];
    facturas.forEach(function(factura) {
      const fila = tablaFacturas.insertRow();
      fila.insertCell().innerText = factura.Id_factura;
      fila.insertCell().innerText = factura.Id_persona;
      fila.insertCell().innerText = factura.tipoDocumento;
      fila.insertCell().innerText = factura.numDocumento;
      fila.insertCell().innerText = factura.Fecha;
    });
  })
  .catch(function(error) {
    console.error(error);
  });

  axios.get(urlDetalles)
  .then(response => {
    const detalles = response.data;

    // Agregar filas a tabla detalles
    const tablaDetalles = document.getElementById('tabla-detalles-facturas').getElementsByTagName('tbody')[0];
    detalles.forEach(detalle => {
      const fila = tablaDetalles.insertRow();
      fila.insertCell().innerText = detalle.Id_detalle_fact;
      fila.insertCell().innerText = detalle.Id_factura;
      fila.insertCell().innerText = detalle.Id_prod;
      fila.insertCell().innerText = detalle.costoUnitario;
      fila.insertCell().innerText = detalle.descripcion;
    });
  })
  .catch(error => console.error(error));
