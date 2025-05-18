<?php
    header("Content-Type: application/json");
    $json = json_decode(file_get_contents("php://input"));
    consulta($json->q, $json->bTags);
    // consulta("mejor","");

    function consulta($tmp, $bTags){
        $db = new mysqli();
        $db->connect('127.0.0.1','root','root','apzweb_db');
        
        //$db->set_charset('utf-8');
        if ($bTags)
            $obj_lnk = $db->query("SELECT apzweb_lnk, apzweb_txt FROM apzweb_list WHERE apzweb_tgs LIKE '%$tmp%'");
        elseif (!$bTags)
            $obj_lnk = $db->query("SELECT apzweb_lnk, apzweb_txt FROM apzweb_list WHERE apzweb_txt LIKE '%$tmp%'");
        
        $aRegistros = [];
        if($obj_lnk){
            while( $registro = $obj_lnk->fetch_object() ){
                // echo $registro->apzweb_lnk;
                array_push($aRegistros, array($registro->apzweb_lnk,$registro->apzweb_txt)); //push text content into array
                // array_push($aTxts[$i], $registro->apzweb_txt);
            }
            // print_r($aTxts);    //Array ( [0] => introduccion android [1] => mejor dcc [2] => otro mejor dcc )
        }
        $db->close();
        echo json_encode($aRegistros);  //echo json_encode('{"llave2" : "orozco apaza"}');
    }
?>