const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();


route.get('/',(req, res) => {
    let sql = "Select Id_empleado,Apellido,Edad,Direccion,Genero,Cargo from empleado;"
    
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
    let sql = 'Select Id_empleado,Apellido,Edad,Direccion,Genero,Cargo from empleado where Id_empleado=?'
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
                Apellido:req.body.Apellido,
                Edad:req.body.Edad,
                Direccion:req.body.Direccion,
                Genero:req.body.Genero,
                Cargo:req.body.Cargo
            }
    let sql = 'Insert into empleado set ?';
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
    let Apellido = req.body.Apellido;
    let Edad= req.body.Edad;
    let Direccion= req.body.Direccion;
    let Genero= req.body.Genero;
    let Cargo = req.body.Cargo;
    let sql = 'Update empleado set Apellido = ?, Genero=?, Direccion=?, Genero=?, Cargo=? where Id_empleado = ?';
    conexion.query(sql,[Apellido,Edad,Direccion,Genero,Cargo,codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });
 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from empleado where Id_empleado = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

module.exports =  route ;
