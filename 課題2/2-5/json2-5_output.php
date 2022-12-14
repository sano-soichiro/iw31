<?php
if($num<1 or $num>=10){
    http_response_code(400);
    echo "範囲外です";
    exit;
}

switch($_SERVER["REQUEST_METHOD"]){
    case "GET":
        $jsonData = [];
        $number = $_GET["number"];
        $fileName = "./json2-5.csv";
        $fp = fopen($fileName , "r");
        $current = file_get_contents($fileName);
        for($i = 0;$i < $number;$i++){
            $jsonData[] =  fread($fp , $current);
        }
        fclose($fp);
        var_dump($jsonData);
        break;
    case "POST":

        break;
}
?>