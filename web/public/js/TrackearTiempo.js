"use strict";
let lVideos = [];
let lFigBtn = []; // botones que permiten editar FIGURE svg elements
let elVideo;
let taNroVid;
let taTiempo;
let btnActual;
let barraProgr;
let selSpeeds;
let selRatios;
let tiempoHMS;
let tmpInstnt = 0;
function inicializarVars() {
    console.log("************inicializando vars***************");
    taNroVid = document.querySelector("#taNroVid");
    taTiempo = document.querySelector("#taTiempo");
    barraProgr = document.querySelector("#barraProgreso");
    selSpeeds = document.querySelector('#selSpeeds');
    selRatios = document.querySelector('#selRatios');
    tiempoHMS = document.querySelector('#tiempoHMS');
    document.querySelectorAll("video").forEach((video, i) => {
        lVideos.push(video);
    });
    // document.querySelectorAll(".figura").forEach((figbtn, i)=>{
    //     lFigBtn.push(figbtn as HTMLInputElement);
    //     figbtn.addEventListener('click',(evnt)=>{
    //         console.log("JIJIJI");
    // const nodoFigure = figbtn.parentElement;
    // console.log(nodoFigure);
    // nodoObject = figbtn.nextSibling as HTMLObjectElement;
    // laFigura = nodoFigure as HTMLElement;
    // let laURL = (nodoObject as HTMLObjectElement).data;
    // taPrimaria.value = laURL.substring(laURL.lastIndexOf('/')+1);
    // taSecndria.value = "FiguraEsEditable";
    //     });
    // });
    const miquery = window.location.search; //?t=23&v=0
    const urlparams = new URLSearchParams(miquery);
    if (miquery !== "") {
        let t = parseInt(urlparams.get('t'));
        let v = parseInt(urlparams.get('v'));
        timeMachine(t, v);
    }
}
function cabezalAvanzando(esto) {
    tmpInstnt = Math.trunc(esto.currentTime);
    barraProgr.value = tmpInstnt / elVideo.duration;
    taTiempo.value = tmpInstnt.toString();
    elVideo = esto; //.target as HTMLVideoElement;
    document.querySelectorAll('video').forEach((video, i) => {
        if (video === esto) {
            taNroVid.innerText = i.toString();
        }
    });
}
function editarVideo(esto) {
    elVideo = esto;
    taPrimaria.value = esto.currentSrc.substring(esto.currentSrc.lastIndexOf('/') + 1);
    taSecndria.value = "VideoEsEditable";
}
function timeMachine(tiempo = 0, video = 0, esto) {
    lVideos.forEach(x => x.pause()); //detener reproduccion de tooodos los vids
    elVideo = lVideos[video];
    elVideo.currentTime = tiempo;
    elVideo.play();
    editarBoton(esto);
}
function cambiarRatio(esto) {
    elVideo.playbackRate = Number(esto.value);
}
function editarBoton(esto) {
    btnActual = esto;
    // console.log(btnActual);
    taPrimaria.value = btnActual.getAttribute('onclick').toString();
    taSecndria.value = btnActual.innerText;
}
function fixCurrentElemnt() {
    if (taPrimaria.value.includes('timeMachine')) {
        btnActual.setAttribute('onclick', taPrimaria.value);
        btnActual.innerText = taSecndria.value;
    }
    else {
        switch (taSecndria.value) {
            case 'TablaEsEditable':
                laTabla.style.width = taPrimaria.value;
                break;
        }
    }
}
let bIsPaused = true;
function playPause(esto) {
    var _a, _b;
    elVideo = (_b = (_a = esto === null || esto === void 0 ? void 0 : esto.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.lastElementChild;
    selRatios.value = elVideo.playbackRate.toFixed(1).toString();
    tiempoHMS.innerText = new Date(elVideo.duration * 1000).toISOString().slice(11, 19);
    bIsPaused = elVideo.paused;
    lVideos.forEach(e => e.pause());
    if (bIsPaused) {
        elVideo.play();
        taPrimaria.value = elVideo.currentSrc.substring(elVideo.currentSrc.lastIndexOf('/') + 1);
    }
}
function ir_atraz() {
    elVideo.currentTime -= parseInt(selSpeeds.value);
}
function ir_adelante() {
    elVideo.currentTime += parseInt(selSpeeds.value);
}
