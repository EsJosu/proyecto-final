const url = 'http://localhost:3000/productos/bebidas';

 //const { conexion } = require('./configuracion/database');


//Mostrar Productos de BD
const contenedor = document.getElementById('data')
let resultado = ''
let opcion = 'nuevo'
let cantidad_cat = 6;
sql1 = 'SELECT COUNT(*) FROM productos WHERE Id_cat="3";' //

const Carga_Datos = (datos) => {

    for(let i=0; i < datos.length; i++){
        resultado += `
          <div class="col mb-4">
            <div class="card" style="width: 20rem;">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="${datos[i].Imagen}" class="img-fluid" />
                    <a href="#">
                      <div class="mask"></div>
                    </a>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold negro"><a>${datos[i].Nombre}</a></h5>
                    <p class="mb-2">${datos[i].Descripcion}</p>
                    <hr class="my-3" />
                    <p class="lead negro"><strong>${datos[i].Precio} Bs.</strong></p>
                    <a href="./factura.html" class="btn btn-outline-success p-md-1 mb-0">Comprar</a>
                  </div>
            </div>
          </div>
    `
    }
    contenedor.innerHTML = resultado
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        Carga_Datos(data)
    })
    .catch(error => console.log(error))



const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnEliminar', e => {
    console.log('BORRADO')
    let mensaje = ''
    const fila = e.target.parentNode.parentNode
    const codigo = fila.firstElementChild.innerHTML
    fetch(url+'/'+codigo, { method: 'DELETE' })
        .then( response => {
            response.json()
            console.log(response.json())
            mensaje=response.json()
        } )
        .then( ()=> location.reload())
    console.log(mensaje)
})

//Procedimiento adicion y modificacion
frmData.addEventListener('submit', (e) => {
    e.preventDefault()
    if(opcion=='nuevo'){
        console.log('OPCION Nuevo')
        fetch(url,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(
                {   id_persona:id_persona.value,
                    fechaoper:fechaoper.value,
                    usuario:usuario.value
                }             
            )        
        })
        .then( response => response.json())
        .then( data => {
            const nuevo_dato =[]
            nuevo_dato.push(data)            
            //Carga_Datos(nuevo_producto)
        })
        .then( ()=> location.reload())
    }
    if(opcion=='editar'){    
        console.log('OPCION EDITAR')
        console.log(url+'/'+codigo)
        fetch(url+'/'+codigo,{
            method: 'PUT',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify({
                id_persona:id_persona.value,
                fechaoper:fechaoper.value,
                usuario:usuario.value
            })
        })
        .then( response => response.json() )
        //.then( response => location.reload() )
        .then( data => {
            const modi_dato=[]
            modi_dato.push(data)
           // Carga_Productos(modi_producto)
        })
        .then( ()=> location.reload())
        //.catch(error => console.log(error))
    }
})

//Procedimiento Editar
let codigo = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    // console.log(fila.children[0].innerHTML)
    // console.log('Modificacion') 
    codigo = fila.children[0].innerHTML   
    const id_personaForm = fila.children[1].innerHTML
    const fechaoperForm = fila.children[2].innerHTML
    const usuarioForm = fila.children[3].innerHTML
    console.log(usuarioForm)
    id_persona.value =  id_personaForm
    fechaoper.value =  fechaoperForm
    usuario.value =  usuarioForm
    opcion = 'editar'     
})