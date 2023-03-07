const express = require('express')
const encrypt= require('bcryptjs')

const route = express.Router()
const { conexion } = require('../configuracion/database');


route.get('/',(req, res) => {
    let sql = "Select usuario,clave,id_persona, date_format(fech_reg,'%d-%m-%Y %H:%i:%s') As fech_reg from login;"
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
    let sql = 'Select usuario,clave,id_persona,fech_reg from login where usuario=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',async function(req,res) {
    let clave_encryptada  = await encrypt.hash(req.body.clave,10)
    let data = {
        usuario:req.body.usuario,
        clave:clave_encryptada,
        id_persona:req.body.id_persona,
      }
    let sql = 'Insert into login set ?';

        conexion.query(sql,data,function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo adicionar un campo' });
            }else{
                res.json({ mensaje:'Se adiciono un campo' });
            }
        });
});


// route.post('/compara', async (req, res) => {
//     const usuario = req.body.usuario;
//     let sql = 'select usuario, clave from login where usuario = ?';
//     conexion.query(sql, [usuario], async function(error, results)  {
//       if (error) {
//         console.error('Error al recuperar la clave: ' + error.stack);
//         res.json("error");
//         return;
//       }
//       if (results.length == 0) {
//         res.json('Usuario no encontrado');
//         return;
//       }
//       const contra= results[0].clave;
      
//       await encrypt.compare(req.body.clave, contra)
//         .then((result) => {
//           if (result) {
//             res.json('Dato correcto');
//           } else {
//             res.json('Dato incorrecto');
//           }
//         })
//       });
//     });

route.put('/:codigo',async function(req,res) {
    let clave_encriptada=await encrypt.hash(req.body.clave,10);
    let codigo=req.params.codigo;
    let cla = clave_encriptada;
    let id = req.body.id_persona;

    let sql = 'Update login set clave=?, id_persona=? where usuario=?';
    conexion.query(sql,[cla,id,es,codigo],function(err,resul){
        if(err){
            console.log(err.message);

        }else{
            res.json(resul);
        }
    });
 });
 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from login where usuario = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

 module.exports = route

