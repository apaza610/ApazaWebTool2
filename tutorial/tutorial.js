
var botones = document.querySelectorAll(".mirar");  //document.querySelectorAll("button");
var elVideo = document.getElementsByTagName("video")[0];
var cntVideo = 0;
var btnSpeedy = document.getElementById("Speedy");
var hayasa = 1.0;
let barraProgr = document.getElementById("barraProgreso");
let tiempoSeg = document.getElementById("tiempoSeg");
let tiempoActual = 0;

function cambiarFuente(n){
    cntVideo = n;
    elVideo.src = lVideos[n];
    colorizarBtn(n);
    // document.getElementById("tiempoHMS").innerText = new Date(elVideo.duration * 1000).toISOString().slice(11,19);
}

function colorizarBtn(n){
    for(var i=0; i<botones.length; i++)
        botones[i].style.background = 'darkslategrey';
    botones[n].style.background = 'orange';
}

elVideo.addEventListener('ended',function(){
    cntVideo++;
    // console.log(`este video ha finalizado, cargando el siguiente: ${cntVideo}`);
    if(cntVideo >= lVideos.length)
        cntVideo = 0;
    
    elVideo.src = lVideos[cntVideo];
    document.getElementById("tiempoHMS").innerText = "00:00:00";
    colorizarBtn(cntVideo);
    play_pause();
});

function cabezalAvanzando(){
    tmpInstnt = Math.trunc(elVideo.currentTime); 
    barraProgr.value = tmpInstnt/elVideo.duration;
    tiempoSeg.innerText = tmpInstnt;
}

function cambiarRatio(){
    elVideo.playbackRate = document.getElementById("selRatios").value;
    hayasa = elVideo.playbackRate;
}

function ir_adelante(){
    elVideo.currentTime += Number(document.getElementById("selSpeeds").value);
}

function ir_atraz(){
    elVideo.currentTime -= Number(document.getElementById("selSpeeds").value);
}

function play_pause(){
    if(elVideo.paused){
        elVideo.playbackRate = hayasa;
        elVideo.play();
    }
    else
        elVideo.pause();
        tiempoTotalSeg = new Date(elVideo.duration * 1000).toISOString().slice(11,19);
    document.getElementById("tiempoHMS").innerText = tiempoTotalSeg;
    // console.log('estoy aqui');
    taPaEditar.value = elVideo.src + "#t=" + tiempoSeg.innerText;
    navigator.clipboard.writeText(taPaEditar.value).then(()=>console.log("copiado a clipboard OK")).catch(err => console.log("fallo al copiar!!"));
}

var elementoOld;
var taPaEditar = document.getElementById("paEditar");
function editarOborrar(elpath){
    if(elpath.value.split('\\').length > 2){    //si es un 📂
        elementoOld = elpath.value.split('\\')[1];
        taPaEditar.value = elementoOld;
    }
    else{                                       //si es un video
        elementoOld = elpath.value;
        taPaEditar.value = elpath.value;
    }
}

function botar_basura(){
    location.href = "./?paBorrar=" + taPaEditar.value.replace("./","");
}

function renombrar(){
    location.href = "./?oldName=" + elementoOld + "&newName=" + taPaEditar.value;
}

function scroll_to_top(){
    window.scrollTo(0,0);
}

// document.onkeydown = (e)=>{};
document.addEventListener('keydown', function(e){
    if(e.altKey && e.key == 'p'){
        console.log('lorem');
        e.preventDefault();
        play_pause();
    }
});