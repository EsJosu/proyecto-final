const url = 'http://localhost:3000/productos';

const contenedor = document.getElementById('data')
let resultado = ''
let opcion = 'nuevo'

const Carga_Datos = (datos) => {

    for(let i=0; i < datos.length; i++)
    {
        resultado += `<tr>
        <td>${datos[i].Id_prod}</td>
        <td>${datos[i].Nombre}</td>
        <td>${datos[i].Precio}</td>
         </tr>`
    }
    contenedor.innerHTML = resultado
}
        // <td>
        //     <a class="btnEditar">Editar</a>            
        //     <a class="btnEliminar">Eliminar</a>
        // </td>

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        Carga_Datos(data)
    })
    .catch(error => console.log(error))


//Metodo que nos permite simular los eventos de los objetos de la pagina html
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
                {   
                    Nombre:Nombre.value,
                    Descripcion:Descripcion.value,
                    Precio:Precio.value,
                    Cantidad:Cantidad.value,
                    Imagen:Imagen.value,
                    Id_cat:Id_cat.value
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
                Nombre:Nombre.value,
                Descripcion:Descripcion.value,
                Precio:Precio.value,
                Cantidad:Cantidad.value,
                Imagen:Imagen.value,
                Id_cat:Id_cat.value
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
    console.log(fila.children[0].innerHTML)
    console.log('Modificacion') 
    codigo = fila.children[0].innerHTML   
    const NombreForm = fila.children[1].innerHTML
    const DescripcionForm = fila.children[2].innerHTML
    const PrecioForm = fila.children[3].innerHTML
    const CantidadForm = fila.children[4].innerHTML
    const ImagenForm = fila.children[5].innerHTML
    const Id_catForm = fila.children[6].innerHTML
    console.log(usuarioForm)
    Nombre.value=  NombreForm
    Descripcion.value =  DescripcionForm
    Precio.value =  PrecioForm
    Cantidad.value =  CantidadForm
    Imagen.value =  ImagenForm
    Id_cat.value =  Id_catForm
    opcion = 'editar'     
})