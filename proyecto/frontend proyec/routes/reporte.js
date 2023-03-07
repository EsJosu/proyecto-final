
axios.get('http://localhost:3000/reporte')
  .then(response => {
    const datos = [];

    response.data.forEach((fila) => {
      const objeto = {
        nombre: fila.Nombre,
        vendidos: fila.Vendidos
      };
      datos.push(objeto);
    });

    new Morris.Bar({
      element: 'grafico',
      data: datos,
      xkey: 'nombre',
      ykeys: ['vendidos'],
      labels: ['Vendidos']
    });
  })
  .catch(error => console.error(error));