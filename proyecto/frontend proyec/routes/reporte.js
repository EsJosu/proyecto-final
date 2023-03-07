
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
    var $arrColors = ['#34495E','#581845','#666']
    new Morris.Bar({
      element: 'grafico',
      data: datos,
      xkey: 'nombre',
      ykeys: ['vendidos'],
      labels: ['Vendidos'],
      barColors: function (row,series,type){
        return $arrColors[row.x];
      }
    });
  })
  .catch(error => console.error(error));