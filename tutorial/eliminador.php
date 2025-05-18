<?php
    $Directorio = new RecursiveDirectoryIterator('.');
    $lPathsGral = new RecursiveIteratorIterator($Directorio, RecursiveIteratorIterator::SELF_FIRST); //📂 pdf mp4 txt ... etc
    $lPathsVidStr = [];     //filtrado solo mp4
    $lPathsVidPth = [];     //preservado como objeto path

    $lVideos = [];      //en JSON
    $n = -1;

    foreach($lPathsGral as $elPath){
        if( is_file($elPath) && (pathinfo($elPath, PATHINFO_EXTENSION) == 'mp4') ){
            array_push($lPathsVidPth, $elPath);
            array_push($lPathsVidStr, $elPath->__toString());
            echo realpath($elPath) . "<br>";        //F:\apz\pruebas\MiFolderApaza\27-practiceStudentExercise5.mp4
        }
    }


    print_r($_REQUEST);
    $file_pointer = "F:\\apz\\pruebas\\MiFolderApaza\\27-practiceStudentExercise5.mp4";
  
    if (!unlink($file_pointer)) {
        echo ("$file_pointer no puede borrarse!!");
    }
    else {
        echo ("$file_pointer ha sido borrado!!");
    }
?>