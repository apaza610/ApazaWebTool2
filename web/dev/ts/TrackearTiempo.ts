let lVideos:    HTMLVideoElement[] = [];
let lFigBtn:    HTMLInputElement[] = [];         // botones que permiten editar FIGURE svg elements
let elVideo:    HTMLVideoElement;
let taNroVid:   HTMLSpanElement;
let taTiempo:   HTMLInputElement;
let btnActual:  HTMLButtonElement;
let barraProgr: HTMLProgressElement;
let selSpeeds:  HTMLSelectElement;
let selRatios: HTMLSelectElement;
let tiempoHMS:  HTMLSpanElement;
let tmpInstnt = 0;

function inicializarVars(){
    // console.log("************inicializando vars***************");
    taNroVid = document.querySelector("#taNroVid") as HTMLSpanElement;
    taTiempo = document.querySelector("#taTiempo") as HTMLInputElement;
    barraProgr = document.querySelector("#barraProgreso") as HTMLProgressElement;
    selSpeeds = document.querySelector('#selSpeeds') as HTMLSelectElement;
    selRatios = document.querySelector('#selRatios') as HTMLSelectElement;
    tiempoHMS = document.querySelector('#tiempoHMS') as HTMLSpanElement;

    document.querySelectorAll("video").forEach((video, i)=>{
        lVideos.push(video as HTMLVideoElement);
        video.controls = true;
    });

    const miquery = window.location.search;     //?t=23&v=0
    const urlparams = new URLSearchParams(miquery);

    if(miquery !== ""){
        let t = parseInt(urlparams.get('t')!);
        let v = parseInt(urlparams.get('v')!);
        timeMachine(t,v);
    }
}

function cabezalAvanzando(esto: HTMLVideoElement): void{
    tmpInstnt = Math.trunc(esto.currentTime); 
    barraProgr.value = tmpInstnt/elVideo.duration;
    taTiempo.value = tmpInstnt.toString();
    
    elVideo = esto; //.target as HTMLVideoElement;
    
    document.querySelectorAll('video').forEach((video, i)=>{
        if(video === esto){
            taNroVid.innerText = i.toString();
        }
    })
}

function editarVideo(esto: HTMLVideoElement): void{
    elVideo = esto;
    taPrimaria.value = esto.currentSrc.substring(esto.currentSrc.lastIndexOf('/')+1);
    taSecndria.value = "VideoEsEditable";
}

function timeMachine(tiempo=0, video=0, esto?: HTMLButtonElement): void{
    lVideos.forEach(x=>x.pause());  //detener reproduccion de tooodos los vids
    elVideo = lVideos[video];
    elVideo.currentTime = tiempo;
    elVideo.play();
    editarBoton(esto as HTMLButtonElement);
}

function cambiarRatio(esto: HTMLSelectElement ): void{
    elVideo.playbackRate = Number(esto.value);
}

function editarBoton(esto: HTMLButtonElement): void{
    btnActual = esto;
    // console.log(btnActual);
    taPrimaria.value = btnActual.getAttribute('onclick')!.toString();
    taSecndria.value = btnActual.innerText;
}

function fixCurrentElemnt(): void{
    if(taPrimaria.value.includes('timeMachine')){
        btnActual.setAttribute('onclick', taPrimaria.value);
        btnActual.innerText = taSecndria.value;
    }else{
        switch (taSecndria.value) {
            case 'TablaEsEditable':
                laTabla.style.width = taPrimaria.value;
                break;
        }
    }
}

let bIsPaused = true;
function playPause(esto?: HTMLButtonElement): void{
    elVideo = esto?.parentElement?.parentElement?.lastElementChild as HTMLVideoElement;
    selRatios.value = elVideo.playbackRate.toFixed(1).toString();
    tiempoHMS.innerText = new Date(elVideo.duration * 1000).toISOString().slice(11,19);

    bIsPaused = elVideo.paused;
    lVideos.forEach(e => e.pause());
    if(bIsPaused){
        elVideo.play();
    }
    taPrimaria.value = `${elVideo.currentSrc}#t=${taTiempo.value}`; //.substring(elVideo.currentSrc.lastIndexOf('/')+1);
}

function ir_atraz(){
    elVideo.currentTime -= parseInt(selSpeeds.value);
}

function ir_adelante(){
    elVideo.currentTime += parseInt(selSpeeds.value);
}