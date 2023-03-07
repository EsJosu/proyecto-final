const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();



const query = 'SELECT productos.Id_prod, productos.Nombre, detalle_factura.Id_prod, count(detalle_factura.Id_prod)as Vendidos from productos,detalle_factura where productos.Id_prod = detalle_factura.Id_prod group by detalle_factura.Id_prod';

route.get('/', (req, res) => {
    conexion.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});


module.exports=route
