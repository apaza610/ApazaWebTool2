"use strict";
// let lImages: HTMLImageElement[] = [];
let laImagen;
let laFigura;
function editarImg(esto) {
    taPrimaria.value = esto.src.substring(esto.src.lastIndexOf('/') + 1);
    taSecndria.value = "ImageEsEditable";
    laImagen = esto;
}
let nodoObject;
function editarFigura(esto) {
    const nodoFigure = esto.parentElement;
    console.log(nodoFigure);
    nodoObject = esto.nextSibling;
    laFigura = nodoFigure;
    let laURL = nodoObject.data;
    taPrimaria.value = laURL.substring(laURL.lastIndexOf('/') + 1);
    taSecndria.value = "FiguraEsEditable";
}
function reDimensionar(delta) {
    let ancho = 0;
    switch (taSecndria.value) {
        case 'ImageEsEditable':
            ancho = laImagen.clientWidth + delta;
            laImagen.style.width = `${ancho}px`;
            break;
        case 'FiguraEsEditable':
            ancho = nodoObject.clientWidth + delta;
            nodoObject.style.width = `${ancho}px`;
            break;
    }
}
let laTabla;
function editarTabla(esto) {
    laTabla = esto.closest('table');
    taPrimaria.value = '40%';
    taSecndria.value = 'TablaEsEditable';
}
