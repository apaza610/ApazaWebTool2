<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/apz/templates/tutorial/estilo.css">
    <title>Tutorial</title>
</head>
<body>
    <input type="text" name="paEditar" id="paEditar">....
    <button onclick="renombrar()">名ddd</button>....
        <button onclick="botar_basura()"><img src="/apz/0assets/icons/apz/objetos_trashcan.svg" class="iconito"></button>...
        <a href="../">父</a>
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

        echo "<h4 id='ttlCentral'>".getcwd()."</h4>";
        $lElementos = array_diff(scandir('.'), array('.','..','index.php'));
        // print_r($lElementos);
        foreach ($lElementos as $elemento) {
            if(is_dir($elemento)){
                echo "---> <a href='$elemento'>📂</a>".$elemento;
            }
            else{
                echo "----> 📜<a href='$elemento'>$elemento</a> ";
            }
            echo '<input type="radio" name="grupoEdit" value="'.$elemento.'" onclick="editarOborrar(this)">'.'<br>';
        }
    ?>

    <script src="/apz/templates/tutorial/tutorialRoot.js"></script>
</body>
</html>