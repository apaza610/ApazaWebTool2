/*****************   mostrar/ocultar/mover menuCapitulos *********************************/
const lElementos = document.querySelectorAll("details");
const lMenus = document.querySelectorAll(".menuCapitulos");

let menuDeltaX = 2; //posicionX (en rem) del menuCapitulos

document.addEventListener('keydown', (evento)=>{
    switch(evento.code){
        case 'Backquote':
            lElementos.forEach((elemento)=>{
                elemento.open = !elemento.open;
            });
            break;
        case 'Numpad6':
            lMenus.forEach((elemento)=>{
                menuDeltaX += 10;
                elemento.style.left = `${menuDeltaX.toString()}rem`;
            });
            break;
        case 'Numpad4':
            lMenus.forEach((elemento)=>{
                menuDeltaX -= 10;
                elemento.style.left = `${menuDeltaX.toString()}rem`;
            });
    }
    
});

/*********************************************
 * tiempo en segundos del video en reproduccion
 *********************************************/
const lVideos = document.querySelectorAll("video");
const lTokeis = document.querySelectorAll("h2 span");

window.addEventListener("load", ()=>{
	lVideos.forEach( (pelicula, indice)=>{
		pelicula.addEventListener('timeupdate', (suceso)=>{
			lTokeis[indice].textContent = Math.trunc(pelicula.currentTime);
		});
	});
});

function timeMachine(tiempo, NroVideo){     //mover el cabezal de video al tiempo deseado
    lVideos[NroVideo].currentTime = tiempo;
    lVideos[NroVideo].play();
}

/****************************** conexion con Freeplane *********************************/
if(getUrlVars()['t'] != null){
    timeMachine(getUrlVars()['t'], getUrlVars()['v']);  //presionaste link desde Freeplane
}

function getUrlVars(){          //extraer las variables de la URL
    let variables = {};
    let partes = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        variables[key] = value;
    });
    return variables;
}

/********************** mostrar imagen en dettached window *****************************/
function masInfo(recurso){
    let opciones = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100"; //,width=400,height=400"
    const img = new Image();
    img.src = recurso;
    img.onload = function() {
        opciones += ",width=" + this.width + ",height=" + this.height;
        window.open(recurso,"_blank", opciones, false);    
    }
}

/************************zoom imagen a dimension original******************************/
window.onload = function(){
    lImages = document.querySelectorAll("img")
    let temp="";
    lImages.forEach(elemento=>{
        elemento.addEventListener("mouseover", ()=>{
            temp = elemento.width;
            elemento.width = elemento.naturalWidth
        });
        elemento.addEventListener("mouseout",()=>{
            elemento.width = temp;
        });
    });
    // window.scrollBy(0,30);
}

