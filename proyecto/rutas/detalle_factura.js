const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();


route.get('/',(req, res) => {
    let sql = "Select Id_detalle_fact,Id_factura,Id_prod,costoUnitario,descripcion from detalle_factura;"
    
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+err.message);
            throw err
        }else{
            res.json(resul)
        }
    });
});

route.get('/:codigo',function(req,res) {
    let sql = 'Select Id_detalle_fact,Id_factura,Id_prod,costoUnitario,descripcion from detalle_factura where Id_detalle_fact=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        Id_factura:req.body.Id_factura,
        Id_prod:req.body.Id_prod,
        costoUnitario:req.body.costoUnitario,
        descripcion:req.body.descripcion
            }
    let sql = 'Insert into detalle_factura set ?';
    conexion.query(sql,data, function(err,resul){
        if(err){
            console.log(err.message);
            res.json('Error no se adiciono');
            throw response.json(err.message)
        }else{
            res.json(resul);
            console.log('Positivo, se adiciono');
        }
    });
});


route.put('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let Idfac= req.body.Id_factura;
    let Idprod= req.body.Id_prod;
    let cos= req.body.costoUnitario;
    let desc= req.body.descripcion;
   
    let sql = 'Update detalle_factura set Id_factura = ?, Id_prod=?, costoUnitario=?, descripcion=? where Id_detalle_fact = ?';
    conexion.query(sql,[Idfac,Idprod,cos,desc,codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });
 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from factura where Id_detalle_fact = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

module.exports =  route ;
