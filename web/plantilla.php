<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/apz/templates/web/public/css/ApzTool.css">
<link rel="stylesheet" href="/apz/templates/web/public/css/Tutorial.css">
<!-- <link rel="stylesheet" href="/apz/0estilo/animate/animate.min.css">
<script src="/apz/0code/anime/lib/anime.min.js"></script>
<script src="/apz/0code/typed/lib/typed.min.js"></script> -->
<title>ynpr</title>
</head>
<body>
<div class="pnlCtrls">
    <select name="ratios" id="selRatios" onchange="cambiarRatio(this)">
        <option value="1.5">1.5</option>
        <option value="1.3">1.3</option>
        <option value="1.0" selected="selected">1.0</option>
        <option value="0.7">0.7</option>
    </select>
    <select name="speeds" id="selSpeeds">
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="30">30</option>
    </select>
    <span>
        <button onmouseover="limpiarAreas()">🧹</button>
        <input style="width: 18em;" id="taPrimaria" type="text">
        <button onclick="fixCurrentElemnt()">🛠️</button>
        <input style="width: 10em;" id="taSecndria" type="text">
        <button onclick="remover()"><img src="/apz/0assets/icons/apz/objetos_trashcan.svg" class="iconito"></button>
    </span>
    <progress id="barraProgreso" value="0" max="1"></progress>
    <button onclick="reemplazarTag('marcadortiempo')">⏲️</button>
    <span  id="taNroVid" style="color: white;">0</span>
    <input id="taTiempo" type="number" value="99999" min="0" style='width:4em'>
    <span id="tiempoHMS" style="color: white;">00:00:00</span>
</div>
<button onmouseover="mostrarOcultarTools()" id="apzToolsDiv" style="float: right">目</button>
<script src="/apz/templates/web/public/js/ApzTool.js"></script>
<script src="/apz/templates/web/public/js/TrackearTiempo.js"></script>
<script src="/apz/templates/web/public/js/ImageTools.js"></script>
</body>
</html>