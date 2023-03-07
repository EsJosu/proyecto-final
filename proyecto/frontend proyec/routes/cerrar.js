function eliminar(){
    if(confirm('¿Deseas cerrar cesion?')){
        localStorage.removeItem('token')
        window.location ="login.html";
    }
}
