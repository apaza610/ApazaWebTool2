<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/apz/templates/tutorial/estilo.css">
    <title>Tutorial</title>
</head>
<body>
    <!-- <video src=""></video> -->
    <div class="pnlCtrls">
        <input type="text" name="paEditar" id="paEditar">
        <button onclick="renombrar()">名</button>..
        <button onclick="botar_basura()"><img src="/apz/0assets/icons/apz/objetos_trashcan.svg" class="iconito"></button>
        <?php echo "<span id='ttlCentral'>".getcwd()."</span>"; ?>
        ..<a href="../">父</a>..<a href="/apz/">元</a>
    </div>
    
    <div id="padre">
        <button onclick="scroll_to_top()">上</button>
    </div>
   
    <?php
        function borraDir($dir){    
            foreach (glob($dir.'/*') as $fileOfolder) {
                if(is_dir($fileOfolder))
                        borraDir($fileOfolder);        
                else            
                    unlink($fileOfolder);
                }
            rmdir($dir);
        }
        if ( isset($_GET['paBorrar']) ){
            if(is_dir($_GET['paBorrar'])){
                borraDir($_GET['paBorrar']);
            }
            else{
                unlink($_GET['paBorrar']);
            }
            header("Refresh:0; url='.'");   //reload page cleaning URI variables
        }

        if( isset($_GET['newName']) ){
            rename($_GET['oldName'], $_GET['newName']);
            header("Refresh:0; url='.'");
        }

        $Directorio = new RecursiveDirectoryIterator('.');
        $lPathsGral = new RecursiveIteratorIterator($Directorio, RecursiveIteratorIterator::SELF_FIRST); //📂 pdf mp4 txt ... etc
        $lPathsVidStr = [];     //filtrado solo mp4             // .\24-demo-ProgramsUsingWhileLoop.mp4
        $lPathsVidPth = [];     //preservado como objeto path   // F:\apz\pruebas\MiFolderApaza\24-demo-ProgramsUsingWhileLoop.mp4
        
        $lVideos = [];      //en JSON
        $n = -1;

        foreach($lPathsGral as $elPath){
            if( is_file($elPath) && (pathinfo($elPath, PATHINFO_EXTENSION) == 'mp4') ){
                array_push($lPathsVidPth, $elPath);
                array_push($lPathsVidStr, substr( $elPath, 2 ));      //quitando lo 2 1ros chars de string
            }
        }
        
        echo "<div id='cajavids'>";
        foreach($lPathsVidStr as $pathVideo){
            $n += 1;
            $pathCortado = "";

            if( strpos($pathVideo, "0media") !== false ){   //if( str_contains($pathVideo, "0media") ){
                $patron = "/0media.+/";
                $pathFolder = preg_replace($patron, "", $pathVideo);        //hiperlink a 📂0media
                echo "<a href='$pathFolder'>📁</a>";
            }
            else{
                echo '<img src="/apz/0assets/icons/apz/media_video-player.svg" class="iconito">';
            }
            
            /********Crear path visible en pantalla************/
            if($n < 10){
                echo "<button class='mirar' onclick='cambiarFuente($n)'>0$n</button> ";
            }else{
                echo "<button class='mirar' onclick='cambiarFuente($n)'>$n</button> ";
            }
            $pathCortado = preg_replace("/.0media./","|",$pathVideo);
            $pathCortado = preg_replace("/.mp4/","",$pathCortado);
            if(strpos($pathCortado, "vid0") !== false){
                $pathCortado = preg_replace("/vid0/","",$pathCortado);      // 06-NonDForceItems|07-dForceOnNonDForceDress 
            }
            if(str_contains($pathCortado, "|") && explode("|", $pathCortado)[1] !== ""){
                $pathCortado = explode("|", $pathCortado)[1];
            }
            //echo "<a href='http://?elvid=http://".$_SERVER['SERVER_ADDR'].$_SERVER['SERVER_PORT'].":".$_SERVER['REQUEST_URI']. $lPathsVidStr[$n] . "'>" . $pathVideo . "</a>";
                                                                // /apz/maps/CompleteNodeJS/01-intro.mp4
            echo "<a href='/apz/templates/vidEdit/index.html?elvid=".$_SERVER['REQUEST_URI'].$lPathsVidStr[$n]."'>$pathCortado</a> ";
            echo '<input type="radio" name="grupoEdit" value="'.$lPathsVidPth[$n].'" onclick="editarOborrar(this)">'.'<br>';
        }
        echo "</div>";
    ?>

    <div class="vidcontainer">
        <div class="ctrlBtns">
            <button onclick="ir_atraz()">≪</button>
            <button onclick="play_pause()">▶</button>
            <button onclick="ir_adelante()">≫</button>
        </div>
        <video ontimeupdate="cabezalAvanzando(this)"><source src="0media/${taPrimaria.value}" type="video/mp4"></video>
        <div>
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
            <progress id="barraProgreso" value="0" max="1"></progress>
            <span id="tiempoHMS" style="color: white;">00:00:00</span>║
            <span id="tiempoSeg">segs</span>
        </div>
    </div>

    <script>
        var lVideos = <?php echo json_encode($lPathsVidStr); ?>;
    </script>
    <script src="/apz/templates/tutorial/tutorial.js"></script>
</body>
</html>