const express = require('express');
const mysql = require('mysql2');

const route = express.Router()

const {conexion} = require('../configuracion/database');
route.post('/', async function (req, res) {
    try {
      const { Id_persona,tipoDocumento, numDocumento, detalles } = req.body;
      await conexion.promise().beginTransaction();
      const resultVenta = await conexion.promise().query(
        'INSERT INTO factura (Id_persona,tipoDocumento,numDocumento) VALUES (?, ?, ?)',
        [Id_persona,tipoDocumento, numDocumento]
      );
      const Id_factura = resultVenta[0].insertId;
      
      await Promise.all(
        detalles.map(detalle => conexion.promise().query(
          'INSERT INTO  detalle_factura(Id_factura,Id_prod,costoUnitario,descripcion) VALUES (?, ?, ?, ?)',
          [Id_factura,detalle.Id_prod, detalle.costoUnitario, detalle.descripcion]
        ))
      );
      
      await conexion.promise().commit();
      res.json({
        message: 'Venta insertada correctamente',
        Id_factura: Id_factura
      });
    } catch (error) {
      await conexion.promise().rollback();
      console.log(error);
      res.status(500).json({
        message: 'Error al insertar la venta'
      });
    }
  });
  

// route.get('/',(req, res) => {
//     let sql = "Select id_venta,concat_WS('-',convert(year(fechaoper),char(4)),right(concat('0',convert(month(fechaoper),char(2))),2),right(concat('0',convert(day(fechaoper),char(2))),2)) fechaoper,id_persona,usuario,fech_reg from tventa;"
//     conexion.query(sql, (err, resul) => {
//         if(err) {
//             console.log("Error: "+err.message);
//             throw err
//         }else{
//             //console.log(resul);
//             res.json(resul)
//         }
//     });
// });

// route.get('/:codigo',function(req,res) {
//     let sql = 'Select id_venta,fechaoper,id_persona,usuario,fech_reg from tventa where id_venta=?'
//     conexion.query(sql,[req.params.codigo],function(err,resul){
//         if(err){
//             throw response.json(err.message)
//         }else{
//             res.json(resul);
//         }
//     });
// });


// // http://localhost:3000/ventas/1
// route.put('/:codigo',function(req,res) {
//     let codigo = req.params.codigo;
//     let fecha = req.body.fechaoper;
//     let persona = req.body.id_persona;
//     let usuario = req.body.usuario;
//     let sql = 'Update tventa set fechaoper = ?, id_persona=?, usuario=? where id_venta = ?';
//     conexion.query(sql,[fecha,persona,usuario,codigo],function(err,resul){
//         if(err){
//             console.log(err.message);
//             // throw response.json(error.message);
//         }else{
//             res.json(resul);
//         }
//     });
//  });
//  route.delete('/:codigo',function(req,res) {
//     let codigo = req.params.codigo;
//     let sql = 'Delete from tventa where id_venta = ?';
//     conexion.query(sql,[codigo],function(err,resul){
//         if(err){
//             console.log(err.message);
//             // throw response.json(error.message);
//         }else{
//             res.json(resul);
//         }
//     });
//  });


module.exports=route