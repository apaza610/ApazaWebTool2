<?php
    header("Content-Type: application/json");
    
    $data = json_decode(file_get_contents("php://input"));  //dato POST recibido contenido dentro <article> tags
                                        //htmlspecialchars($_GET['htmlInterno']) convierte brackets < > .... &lt; &gt;
    
    $cadena = '<article contenteditable="false">'.$data->keyDato.'</article>'.
    '<footer>'.$data->keyFoot.'</footer>';
    
    $pathMedio  = preg_replace('/http.+apz/','/apz',$_SERVER['HTTP_REFERER']);   // /apz/maps/.../02-howComputerWorks/
    $pathMedio  = preg_replace('/\/\?t=.+/','/',$pathMedio);   // quitando la colita: /?t=1429&v=1 de URI request
    $pathBase   = $_SERVER['DOCUMENT_ROOT'];       //E:/xampp/htdocs
    $pathEnDisco= $pathBase.$pathMedio.'index.php';// /mnt/sdcard/htdocs/apz/maps/AbdulBari/01-Fundamentals/02-howComputersWorks/index.php
    
    $本 = fopen($pathEnDisco,"w") or die("hay fallo!");
    // $文字列 = $html->saveHTML($html->documentElement);  // correccion para 日本語
    // fwrite($本, htmlspecialchars_decode($文字列));      // convert back &lt;  &gt:  .... < >
    
    $cadenaOLD = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/apz/templates/webExt/index.php'); // raw html documento!!

    $pattern = 'articleNoTame';     //el tag article en su totalidad
    $deseado = $data->keyDato;
    $cadenaFIN = str_replace($pattern, $deseado, $cadenaOLD);   //hasta aqui bien en mobile
    $pattern = 'footerNoTame';
    $deseado = $data->keyFoot;
    $cadenaFIN = str_replace($pattern, $deseado, $cadenaFIN);

    // fseek($本, 78); //evitar borrar 1ra linea: require $_SERVER['DOCUMENT_ROOT']/apz/templates/web/plantilla.php
    fwrite($本, $cadenaFIN);
    fclose($本);
    // header("Location: ".$_SERVER['HTTP_REFERER']); //retornar a previous page (no necesario si usas AJAX)
    // die();
?>
