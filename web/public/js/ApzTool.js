"use strict";
let tagArticle;
let tagFooter;
let taPrimaria;
let taSecndria;
window.onload = () => {
    cargarTags();
    inicializarVars();
};
function cargarTags() {
    tagArticle = document.querySelector("article");
    tagFooter = document.querySelector("footer");
    taPrimaria = document.querySelector("#taPrimaria");
    taSecndria = document.querySelector("#taSecndria");
}
let bEsEditable = false;
function hacerEditable(esteBtn) {
    tagArticle.contentEditable = bEsEditable ? "false" : "true";
    tagFooter.contentEditable = bEsEditable ? "false" : "true";
    esteBtn.style.textDecoration = bEsEditable ? "line-through" : "none";
    bEsEditable = !bEsEditable;
}
function fileWrite() {
    limpiarTypedJS(); //TypedJS temp modifications
    limpiarAnimeJS();
    let xhttp = new XMLHttpRequest;
    xhttp.open("POST", "/apz/templates/web/public/php/documentoWrite.php", true); //no uses GET si URI es Too Long
    xhttp.send(JSON.stringify({ "keyDato": document.querySelector("article").innerHTML,
        "keyFoot": document.getElementsByTagName("footer")[0].innerText }));
    //ver si se pudo guardar o no se pudo guardar el dato necesario
    xhttp.onload = function (dato) { alert("edited PHP was stored"); };
}
function darFormato(elTag, laClase = "") {
    let seleccion, rango, cadena;
    seleccion = window.getSelection();
    cadena = seleccion.toString();
    rango = seleccion === null || seleccion === void 0 ? void 0 : seleccion.getRangeAt(0);
    rango.setEnd(rango.endContainer, rango.endOffset); //mueve la seleccion en la linea !!!
    let 外 = document.createElement(elTag);
    let 中 = document.createTextNode(cadena);
    外.appendChild(中);
    if (laClase !== "")
        外.classList.add(laClase);
    rango === null || rango === void 0 ? void 0 : rango.deleteContents();
    let nuevoSpan = document.createElement("span");
    nuevoSpan.textContent = " ";
    rango === null || rango === void 0 ? void 0 : rango.insertNode(nuevoSpan);
    rango === null || rango === void 0 ? void 0 : rango.insertNode(外);
}
let selTagDeseado;
function crearTag(tipo) {
    selTagDeseado = document.querySelector('#tagDeseado');
    switch (tipo) {
        case 'tag':
            switch (selTagDeseado.value) {
                case 'juego':
                    taPrimaria.value = `<a href="juego1/">🎮</a>`;
                    break;
                case 'span':
                    taPrimaria.value = '<span>..</span>';
                    break;
                case 'hr':
                    taPrimaria.value = '<hr>';
                    break;
                case 'br':
                    taPrimaria.value = '<br><br><br><br>';
                    break;
                case 'list':
                    taPrimaria.value = '<ul><li>..</li></ul>';
                    break;
                case 'animeJS':
                    taPrimaria.value = '<span class="animejs" id="animado1">**--**</span>';
                    break;
                case 'typedJS':
                    taPrimaria.value = '<span class="typedjs" id="tipeado1">*-*-</span>';
                    break;
            }
            break;
        case 'pelicula':
            taPrimaria.value = `<span class="vidcontainer"><span><button onclick="ir_atraz()">≪</button><button onclick="playPause(this)">▶</button><button onclick="ir_adelante()">≫</button></span><video onclick="editarVideo(this)" ontimeupdate="cabezalAvanzando(this)"><source src="0media/${taPrimaria.value}" type="video/mp4"></video></span>`;
            break;
        case 'figura':
            taPrimaria.value = `<figure><button onclick="editarFigura(this)">x</button><object class="hero" data="0media/${taPrimaria.value}" border="1"></object></figure>...`;
            break;
        case 'imagen':
            taPrimaria.value = `<img src="0media/${taPrimaria.value}" class="explica1" onclick="editarImg(this)">`;
            break;
        case 'columnas':
            let numFils = parseInt(document.getElementById("numFils").value);
            let numCols = parseInt(document.getElementById("numCols").value);
            let cadena = '<table>';
            for (let i = 1; i <= numFils; i++) {
                cadena += '<tr>';
                for (let j = 1; j <= numCols; j++) {
                    if (i === 1 && j === 1)
                        cadena += '<td onclick="editarTabla(this)">..</td>';
                    else
                        cadena += '<td>..</td>';
                }
                cadena += '</tr>';
            }
            cadena += '</table>';
            taPrimaria.value = cadena;
            break;
    }
}
function reemplazarTag(comando) {
    let seleccion = window.getSelection();
    let rango = seleccion.getRangeAt(0);
    let cadena = seleccion.toString();
    let miDocFragment;
    switch (comando) {
        case 'rawhtml':
            miDocFragment = rango === null || rango === void 0 ? void 0 : rango.createContextualFragment(taPrimaria.value);
            rango === null || rango === void 0 ? void 0 : rango.deleteContents();
            rango === null || rango === void 0 ? void 0 : rango.insertNode(miDocFragment);
            break;
        case 'hyperlink':
            taPrimaria.value = `<a href="${taPrimaria.value}">${cadena}</a>`;
            break;
        case 'marcadortiempo':
            miDocFragment = rango === null || rango === void 0 ? void 0 : rango.createContextualFragment(`<button class="timeMachine" onclick="timeMachine(${taTiempo.value}, ${taNroVid.innerText}, this)">${cadena}</button>`);
            rango === null || rango === void 0 ? void 0 : rango.deleteContents();
            rango === null || rango === void 0 ? void 0 : rango.insertNode(miDocFragment);
            // inicializarVars();
            break;
    }
    inicializarVars();
}
function getFolderPath() {
    const urlPagina = window.location.href;
    let pathEnOS = urlPagina.replace("http://localhost/", "D:\\");
    taPrimaria.value = pathEnOS;
    taPrimaria.select();
    document.execCommand('copy');
}
let bToolsVisible = false;
let apzTools;
function mostrarOcultarTools() {
    bToolsVisible = !bToolsVisible;
    if (bToolsVisible) {
        let xhttp = new XMLHttpRequest;
        xhttp.open("POST", "/apz/templates/web/public/php/toolApzCargar.php", true);
        xhttp.send();
        xhttp.onload = (dato) => {
            apzTools = document.createElement("div");
            apzTools.innerHTML = xhttp.response;
            document.body.appendChild(apzTools);
            // inicializarVars();
            // cargarTags();
        };
    }
    else {
        apzTools.remove();
    }
}
function limpiarAreas() {
    taPrimaria.value = taSecndria.value = "";
}
function remover() {
    if (taPrimaria.value.includes('timeMachine')) {
        btnActual.remove();
        return;
    }
    switch (taSecndria.value) {
        case 'ImageEsEditable':
            laImagen.remove();
            break;
        case 'FiguraEsEditable':
            laFigura.remove();
            break;
        case 'VideoEsEditable':
            elVideo.parentElement.remove();
            break;
        case 'TablaEsEditable':
            laTabla.remove();
            break;
    }
}
let bFlotaDerecha = true;
function flotarIzqDer() {
    bFlotaDerecha = !bFlotaDerecha;
    switch (taSecndria.value) {
        case 'FiguraEsEditable':
            laFigura.style.float = bFlotaDerecha ? 'right' : 'left';
            break;
        case 'TablaEsEditable':
            laTabla.style.float = bFlotaDerecha ? 'left' : 'right';
            break;
        case 'VideoEsEditable':
            elVideo.parentElement.style.float = bFlotaDerecha ? 'left' : 'right';
            break;
    }
}
function darEstiloAnki() {
    document.querySelector("article").style.width = '365px';
    document.querySelector("article").style.height = '580px';
}
function limpiarTypedJS() {
    let lMaquinas = document.querySelectorAll(".typedjs");
    let lCursores = document.querySelectorAll(".typed-cursor");
    lMaquinas.forEach(elem => elem.innerHTML = '');
    lCursores.forEach(elem => elem.remove());
}
function limpiarAnimeJS() {
    let lAnimes = document.querySelectorAll(".animejs");
    console.log(lAnimes);
    lAnimes.forEach(elem => elem.removeAttribute("style"));
}
document.onkeydown = (e) => {
    if (e.key === 'F2') {
        e.preventDefault();
        hacerEditable(document.querySelector("#edt"));
    }
    else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        fileWrite(); //php writes in disk
    }
    else if (e.key === 'F1') {
        alert(`-----------atajos----------------
F2: pone este documento en modo edicion
ctrl s: guarda este documento en disco
shift 🖱️wheel: corregir tiempo en boton
F4: copiar video URI + t a clipboard`);
    }
    else if (e.key === 'F4') {
        e.preventDefault();
        navigator.clipboard.writeText(taPrimaria.value);
    }
};
document.addEventListener('wheel', function (evento) {
    if (evento.shiftKey) {
        let cadena = taPrimaria.value;
        let regex = /\d+/g;
        let matches = cadena.match(regex);
        let nuevoTiempo = parseInt(matches[0]);
        if (evento.deltaY > 0)
            nuevoTiempo--;
        else
            nuevoTiempo++;
        cadena = cadena.replace(matches[0], nuevoTiempo.toString());
        taPrimaria.value = cadena;
        fixCurrentElemnt();
    }
});
