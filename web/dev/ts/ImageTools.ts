// let lImages: HTMLImageElement[] = [];
let laImagen: HTMLImageElement;
let laFigura: HTMLElement;

function editarImg(esto: HTMLImageElement): void{
    taPrimaria.value = esto.src.substring(esto.src.lastIndexOf('/')+1);
    taSecndria.value = "ImageEsEditable";
    laImagen = esto;
}

let nodoObject: HTMLObjectElement;
function editarFigura(esto: HTMLInputElement): void{
    const nodoFigure = esto.parentElement;
    console.log(nodoFigure);
    nodoObject = esto.nextSibling as HTMLObjectElement;
    laFigura = nodoFigure as HTMLElement;
    let laURL = (nodoObject as HTMLObjectElement).data;
    taPrimaria.value = laURL.substring(laURL.lastIndexOf('/')+1);
    taSecndria.value = "FiguraEsEditable";
}

function reDimensionar(delta: number): void{
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

let laTabla: HTMLTableElement;
function editarTabla(esto: HTMLTableElement): void{
    laTabla = esto.closest('table')!;
    taPrimaria.value = '40%';
    taSecndria.value = 'TablaEsEditable';
}