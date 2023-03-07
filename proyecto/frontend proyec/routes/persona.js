const token = localStorage.getItem('token');
const url='http://localhost:3000/person';

const contenedor=document.getElementById('data');
let resultado='';
const carga_persona = (persona)=>{
    persona.forEach(persona => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
        <td>${persona.Id_persona}</td>
        <td>${persona.Nombre}</td>
        <td>${persona.Telefono}
        <td>${persona.Ci}</td>
        <td>${persona.Nit}</td>
                          <td style="cursor:pointer" bgcolor="#f67280" ><a  class='btnDelete' >Eliminar</a></td>
                          <td style="cursor:pointer" bgcolor="#ffbfb0" ><a class='btnEditar' >Editar</a></td>
                          </tr>`
    });
    contenedor.innerHTML=resultado;
}  
fetch(url, {
    method: 'GET',
    headers: { 'Authorization': token
   }
  })
.then(response => response.json())
 .then(data => carga_persona(data))
.catch(error => console.log(error))

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
    fetch(url +'/'+codigo,{method:'DELETE',
    headers: { 'Authorization': token
}})
    .then(response=>response.json())
    .then(()=>location.reload())
})
//-------------POST
let operacion='adicionar'
form_persona.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            Nombre:Nombre.value,
            Telefono:Telefono.value,
            Ci:Ci.value,
            Nit:Nit.value
 })
})
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
            //carga_ciudad(nuevo_producto);

        })
        .then(()=>location.reload())
}
    if(operacion=='modificar'){
        fetch(url+'/'+Id_persona,{method:'PUT',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            Nombre:Nombre.value,
            Telefono:Telefono.value,
            Ci:Ci.value,
            Nit:Nit.value
        })
        })
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
            carga_persona(nuevo_producto);
        })
        .then(()=>location.reload())
    }
})
let Id_persona=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    Id_persona=fila.children[0].innerHTML
    const fnom=fila.children[1].innerHTML
    const ftel=fila.children[2].innerHTML
    const fci=fila.children[3].innerHTML
    const fnit=fila.children[4].innerHTML

    Nombre.value=fnom,
    Telefono.value=ftel,
    Ci.value=fci,
    Nit.value=fnit,
    operacion='modificar'
    chil
})