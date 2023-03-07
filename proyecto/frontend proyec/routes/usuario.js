const url='http://localhost:3000/login';
const contenedor=document.getElementById('data');
let resultado='';

const carga_usuario = (usuario)=>{
    usuario.forEach(usuario => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
                        <td>${usuario.usuario}</td>
                          <td>${usuario.clave}</td>
                          <td>${usuario.id_persona}
                          <td style="cursor:pointer" bgcolor="#f67280" ><a  class='btnDelete' >Eliminar</a></td>
                          <td style="cursor:pointer" bgcolor="#ffbfb0" ><a class='btnEditar' >Editar</a></td>
                          </tr>`
    });
    contenedor.innerHTML=resultado;
}  
const on=(element,event,selector,handler)=>{
    element.addEventListener(event, e =>{
    if(e.target.closest(selector)){
        handler(e)
    }
})
}
//------DELETE
on (document,'click','.btnDelete', e=>{
     fila=e.target.parentNode.parentNode 
    const codigo=fila.firstElementChild.innerHTML
    fetch(url +'/'+codigo,{method:'DELETE'})
    .then(response=>response.json())
    .then(()=>location.reload())
})
//-------------POST
let operacion='adicionar'
form_usuario.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            usuario:usuario.value,
            clave:clave.value,
            id_persona:id_persona.value,

 })
})
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)

        })
        .then(()=>location.reload())
}
    if(operacion=='modificar'){
        fetch(url+'/'+usuario,{method:'PUT',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            usuario:usuario.value,
            clave:Telefono.clave,
            id_persona:id_persona.value,
  
        })
        })
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
        })
        .then(()=>location.reload())
    }
})


on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode

    const usu=fila.children[0].innerHTML
    const cla=fila.children[1].innerHTML
    const id=fila.children[2].innerHTML


    usuario.value=usu,
    clave.value=cla,
    id_persona.value=id,
    operacion='modificar'
    chil
})
fetch(url)
.then(response => response.json())
.then(data => carga_usuario(data))
.catch(error => console.log(error))

