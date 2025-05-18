var elementoOld;
var taPaEditar = document.getElementById("paEditar");
function editarOborrar(elpath){
    elementoOld = elpath.value;
    taPaEditar.value = elpath.value;
}

function botar_basura(){
    location.href = "./?paBorrar=" + taPaEditar.value.replace("./","");
}

function renombrar(){
    location.href = "./?oldName=" + elementoOld + "&newName=" + taPaEditar.value;
}