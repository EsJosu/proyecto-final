const express = require('express');
const cors = require('cors');
const test = require('./middlewires/autenticacion')
const app = express();

app.use(express.json());
app.use(cors());


const categoria=require('./rutas/categoria')
const factura=require('./rutas/factura')
const login=require('./rutas/login')
const detalle_factura=require('./rutas/detalle_factura')
const persona=require('./rutas/persona')
const productos=require('./rutas/productos')
const acceso=require('./rutas/acceso')
const reporte=require('./rutas/reporte')
const add=require('./rutas/add')




app.use('/categoria',categoria);
app.use('/factura',factura);
app.use('/det',detalle_factura);
app.use('/person',persona);
app.use('/productos',productos);
app.use('/login',login);
app.use('/acceso',acceso);
app.use('/reporte',test,reporte);
app.use('/add',add);


const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});